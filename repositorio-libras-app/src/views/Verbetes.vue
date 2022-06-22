<template>
  <div class="rl-verbete-card-wrap">
    <div class="rl-verbetes-header">
      <div class="rl-verbetes-titulo">
        <h1>Verbetes</h1>
        <h2>{{this.verbeteCategoriaFiltro.categoriaNome === '' ?
            'Geral' : this.verbeteCategoriaFiltro.categoriaNome}}</h2>
        <h3>{{this.verbeteSubcategoriaFiltro === '' ?
             '' : this.verbeteSubcategoriaFiltro}}</h3>
      </div>
      <div class="rl-verbetes-meus-verbetes">
        <button @click="verTodosVerbetes">Ver Todos</button>
        <button @click="verMeusVerbetes">Meus Verbetes</button>
      </div>

      <div class="rl-verbetes-filtros">
        <h2>Filtros</h2>
        <div class="rl-verbetes-filtros-wrapper">
            <div class="rl-verbetes-filtros__titulo-autor">
              <label>{{isTodosVerbetes ? 'Autor ou Título' : 'Título'}}: </label>
              <input type="text" v-model="pesquisa" placeholder="Ex.: Herborização"/>
            </div>
            <div class="rl-verbetes-filtros__categoria">
              <label>Categoria: </label>
              <select v-model="verbeteCategoriaFiltro">
                <option :value="verbeteCategoriaFiltroVazio">Todas as categorias</option>
                <option v-for="(categoria, index) in verbetesCategorias"
                        :key="index" :value="categoria">
                  {{categoria.categoriaNome}}</option>
              </select>
            </div>
          <div class="rl-criar-verbete-categorias__subcategoria">
            <label>Subcategoria: </label>
            <select v-model="verbeteSubcategoriaFiltro"
                    :disabled="verbeteCategoriaFiltro &&
                    verbeteCategoriaFiltro.categoriaSubcategorias.length === 0">
                <option value="">Selecione uma subcategoria</option>
              <option
                    v-for="(subcategoria, index) in verbeteCategoriaFiltro.categoriaSubcategorias"
                    :key="index" :value="subcategoria">
                  {{subcategoria}}
                </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div id="rl-verbetes-todos" class="verbete-cards container" v-if="isTodosVerbetes">
      <div class="toggle-edit">
        <span>Modo Edição</span>
        <input type="checkbox" v-model="editVerbete" />
      </div>

        <VerbeteCard
          :verbete="verbete"
          v-for="(verbete, index) in verbetes"
          :key="index"
        />
    </div>

    <div id="rl-verbetes-meus" class="verbete-cards container" v-if="!isTodosVerbetes">
      <div class="toggle-edit">
        <span>Modo Edição</span>
        <input type="checkbox" v-model="editVerbete" />
      </div>

      <VerbeteCard
          :verbete="verbete"
          v-for="(verbete, index) in meusVerbetes"
          :key="index"
      />
    </div>
    <div class="rl-verbetes-inexistentes"
         v-if="isTodosVerbetes && verbetes.length === 0
         || !isTodosVerbetes && meusVerbetes.length === 0">
      <p>Não existem verbetes. Adicione mais verbetes para que sejam encontrados.</p>
    </div>
  </div>
</template>

<script>
import VerbeteCard from '../components/VerbeteCard.vue';

export default {
  name: 'Verbetes',
  components: {
    VerbeteCard,
  },
  data() {
    return {
      currentCategoria: 'Geral',
      pesquisa: '',
      verbeteCategoriaFiltroVazio: {
        categoriaNome: String(''),
        categoriaSubcategorias: []
      },
      verbeteCategoriaFiltro: {
        categoriaNome: String(''),
        categoriaSubcategorias: []
      },
      verbeteProfileIdFiltro: String(''),
      verbeteSubcategoriaFiltro: String(''),
      isTodosVerbetes: true,
    };
  },
  methods: {
    verTodosVerbetes() {
      this.limparFiltros();
      this.isTodosVerbetes = true;
    },
    verMeusVerbetes() {
      this.limparFiltros();
      this.isTodosVerbetes = false;
    },
    limparFiltros() {
      this.pesquisa = '';
      this.verbeteCategoriaFiltro = this.verbeteCategoriaFiltroVazio;
      this.verbeteSubcategoriaFiltro = '';
    },
  },
  computed: {
    verbetes() {
      return this.$store.state.verbetes.filter((verbete) => {
        const verbeteNome = verbete.verbeteNome.toLowerCase();
        const verbeteAutor = verbete.profileFullName.toLowerCase();
        const pesquisaNome = this.pesquisa.toLowerCase();
        const categoria = verbete.verbeteCategoria.toLowerCase();
        const subcategoria = verbete.verbeteSubcategoria.toLowerCase();
        // eslint-disable-next-line max-len
        const categoriaFiltro = this.verbeteCategoriaFiltro.categoriaNome.toLowerCase();
        const subcategoriaFiltro = this.verbeteSubcategoriaFiltro.toLowerCase();

        return categoria.includes(categoriaFiltro) && subcategoria.includes(subcategoriaFiltro)
            && (verbeteNome.includes(pesquisaNome) || verbeteAutor.includes(pesquisaNome));
      });
    },
    user() {
      return this.$store.state.user;
    },
    usuario() {
      return this.$store.state.usuario;
    },
    meusVerbetes() {
      return this.verbetes.filter((verbete) => {
        const verbeteNome = verbete.verbeteNome.toLowerCase();
        const pesquisaNome = this.pesquisa.toLowerCase();
        const categoria = verbete.verbeteCategoria.toLowerCase();
        const subcategoria = verbete.verbeteSubcategoria.toLowerCase();
        // eslint-disable-next-line max-len
        const categoriaFiltro = this.verbeteCategoriaFiltro.categoriaNome.toLowerCase();
        const subcategoriaFiltro = this.verbeteSubcategoriaFiltro.toLowerCase();

        return verbete.profileId === this.usuario.profileId &&
            verbeteNome.includes(pesquisaNome) &&
            (categoria.includes(categoriaFiltro) ||
                subcategoria.includes(subcategoriaFiltro));
      });
    },
    editVerbete: {
      // Retorna o estado atual do valor de editVerbete
      get() {
        return this.$store.state.editVerbete;
      },
      set(payload) {
        // Atualiza o valor armazenado state toggleEditVerbete
        this.$store.commit('toggleEditVerbete', payload);
      },
    },
    verbeteSubcategoria: {
      get() {
        return this.$store.state.verbeteSubcategoria;
      },
      set(payload) {
        this.$store.commit('updateVerbeteSubCategoria', payload);
      },
    },

    verbetesCategorias() {
      return this.$store.getters.verbetesCategorias;
    },
  },
  // Quando o usuário sair da view blogs, o valor da state toggleEditVerbete mudará para 'false'
  beforeyDestroy() {
    this.$store.commit('toggleEditVerbete', false);
  },
  watch: {
    verbeteCategoriaFiltro() {
      this.verbeteSubcategoriaFiltro = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.rl-verbetes-titulo, .rl-verbetes-filtros, .rl-verbetes-meus-verbetes {
  padding: 0 30px;
  margin-bottom: 30px;
}

.rl-verbetes-filtros h2 {
  margin-bottom: 20px;
}

.rl-verbetes-filtros-wrapper {
  display: flex;

  div {
    margin-right: 30px;
  }

  select, input {
    height: 30px;
    padding: 5px;
    background-color: #fafafa;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
  }

  @media (min-width: 500px) {
    flex-direction: column;
  }

  @media (min-width: 600px) {
    flex-direction: row;
  }
}

.verbete-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -50px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type='checkbox'] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type='checkbox']:before {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type='checkbox']:before {
      background: #fff;
      left: 52px;
    }
  }
}

.rl-verbetes-meus-verbetes {
  button {
    background-color: #004d40;
    font-weight: 600;
  }

  button:first-child {
    margin-right: 15px;
  }
}

.rl-verbetes-inexistentes {
  width: 100%;
  height: 250px;
  background-color: #d2d2d2;
  text-align: center;
  padding: 100px 0;
  border-radius: 5px;
  font-size: 20px;
}
</style>
