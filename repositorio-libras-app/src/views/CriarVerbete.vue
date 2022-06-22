<template>
  <div class="criar-verbete">
    <VerbeteCoverPreview v-show="this.$store.state.verbeteImagemPreview" />
    <LoadingAnimation v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Erro: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="verbete-info">
        <input
          type="text"
          placeholder="Nome do Verbete"
          v-model="verbeteNome"
        />

        <div class="upload-file">
          <label class="label-verbete-photo" for="verbete-photo">Selecione a Imagem</label>
          <input
            type="file"
            ref="verbetePhoto"
            id="verbete-photo"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <!-- TODO 6 - Sugestão: tentar melhorar a preview substituindo por um modal  -->
          <button
            @click="openPreview"
            class="preview"
            :class="{
              'button-inactive': !this.$store.state.verbeteImagemFileURL,
            }"
          >
            Pré-visualizar
          </button>
          <span>Arquivo: {{ this.verbeteImagemNome }}</span>
        </div>
      </div>

      <div class="rl-criar-verbete-categorias">
        <div class="rl-criar-verbete-categorias__categoria">
          <label>Categoria: </label>
          <select v-model="verbeteCategoria">
            <option disabled value="">Selecione uma categoria</option>
            <option v-for="(categoria, index) in verbetesCategorias"
                    :key="index" :value="categoria">
              {{categoria.categoriaNome}}</option>
          </select>
        </div>

        <div class="rl-criar-verbete-categorias__subcategoria">
          <label>Subcategoria (opcional): </label>
          <select v-model="verbeteSubcategoria"
                  :disabled="verbeteCategoria &&
                  verbeteCategoria.categoriaSubcategorias.length === 0">
            <option disabled value="">Selecione uma subcategoria</option>
            <option v-for="(subcategoria, index) in verbeteCategoria.categoriaSubcategorias"
                    :key="index" :value="subcategoria">
              {{subcategoria}}
            </option>
          </select>
        </div>
      </div>

      <div class="rl-criar-verbete-definicao">
        <textarea
          placeholder="Escrever definição..."
          id="rl-text-area-criar-verbete-definicao"
          v-model="verbeteDefinicao"
        />
      </div>

      <div class="rl-inserir-verbete-video">
        <label for="verbete-video">Inserir o Link do Vídeo: </label>
        <input class="verbete-video" type="url" name="url" id="url"
               placeholder="https://www.youtube.com/embed/mtXAeIDA6vI"
               title="Insira o link do vídeo que será anexado com o verbete."
               pattern="https://youtube.com/embed/*" size="250"
               v-model="verbeteLinkVideo">
      </div>

      <div class="verbete-actions">
        <button
          @click="save"
          :class="{
            'button-inactive':
              !this.verbeteCategoria ||
              !this.verbeteLinkVideo ||
              !this.verbeteDefinicao ||
              !this.$store.state.verbeteImagemFileURL,
          }"
        >
          Publicar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
import $ from 'jquery';
import db from '../firebase/firebaseInit';

import VerbeteCoverPreview from '../components/VerbeteCoverPreview.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';

export default {
  name: 'CriarVerbete',
  data() {
    return {
      file: null,
      error: '',
      errorMsg: null,
      loading: null,
      verbeteNome: '',
      verbeteDefinicao: '',
      verbeteCategoria: '',
      verbeteSubcategoria: '',
      verbeteLinkVideo: '',
      verbeteImagemNome: '',
    };
  },
  components: {
    VerbeteCoverPreview,
    LoadingAnimation,
  },
  methods: {
    // eslint-disable-next-line max-len
    //  TODO 5 - [AJUSTE] verificar bug nesse método que faz o arquivo perder informação após o preview do post
    fileChange() {
      const firstFile = this.$refs.verbetePhoto.files[0];
      this.file = firstFile;

      const fileName = this.file.name;

      this.$store.commit('fileNameChange', fileName);
      this.$store.commit('createFileURL', URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit('openPhotoPreview');
    },

    save() {
      // eslint-disable-next-line max-len
      if (this.verbeteNome.length > 0 && this.verbeteDefinicao.length > 0 && this.verbeteCategoria) {
        if (this.file) {
          if (!this.isVerbeteVideoValido()) {
            // eslint-disable-next-line no-alert
            alert('O link do vídeo não está no formato adequado. Certifique-se de que está inserindo o link corretamente');
            return;
          }

          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/VerbeteImagem/${this.verbeteImagemNome}`
          );
          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => {
              // TODO 3 - [AJUSTE] Responder mostrando uma mensagem de sucesso
              console.log(snapshot);
            },
            (err) => {
              this.loading = false;
              // TODO 4 - [AJUSTE] Responder mostrando uma mensagem de erro acessível
              console.log(err);
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              const timestamp = await Date.now();
              const dataBase = await db.collection('verbetes').doc();

              await dataBase.set({
                verbeteId: dataBase.id,
                verbeteCategoria: this.verbeteCategoria.categoriaNome,
                verbeteSubcategoria: this.verbeteSubcategoria,
                verbeteDefinicao: this.verbeteDefinicao,
                verbeteImagem: downloadURL,
                verbeteImagemNome: this.verbeteImagemNome,
                verbeteNome: this.verbeteNome,
                verbeteContador: 0,
                verbeteCurtidas: 0,
                verbeteLinkVideo: this.verbeteLinkVideo,
                // eslint-disable-next-line max-len
                profileFullName: this.$store.state.profileFirstName + this.$store.state.profileLastName,
                profileId: this.profileId,
                date: timestamp,
              });
              await this.$store.dispatch('getVerbetes');

              this.loading = false;
              this.$router.push({
                name: 'VerVerbete',
                params: { verbeteId: dataBase.id },
              });
            }
          );
          return;
        }

        this.error = true;
        this.errorMsg =
          'Por favor verifique se foi selecionado uma imagem de fundo para o verbete.';
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }

      this.error = true;
      this.errorMsg =
        'Por favor verifique se os campos foram preenchidos corretamente.';
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },

    disableKeysTextArea() {
      $('#rl-text-area-criar-verbete-definicao').keydown((e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });
    },

    isVerbeteVideoValido() {
      const urlRegex = /(((https?:\/\/)|(www\.))((youtube\.com\/watch)|(youtube\.com\/embed)+))/g;
      const resultado = this.verbeteLinkVideo.match(urlRegex);
      const tamanhoLink = this.verbeteLinkVideo.length;
      const pattern = 'https://youtube.com/embed/';

      if (resultado.length > 0) {
        if (resultado[0] === 'www.youtube.com/watch') {
          this.verbeteLinkVideo = pattern + this.verbeteLinkVideo.substring(tamanhoLink, 32);
        }

        return true;
      }

      return false;
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },

    verbetesCategorias() {
      return this.$store.getters.verbetesCategorias;
    },
  },
  mounted() {
    this.disableKeysTextArea();
  },
};
</script>

<style lang="scss">
.criar-verbete {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  .label-verbete-photo,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 20px;
    background-color: #c83349;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .verbete-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .verbete-video {
    border: 1px solid #303030;
    border-radius: 5px;
    outline: none !important;
    width: 30%;
    height: 30px;
    padding: 0 4px;
    margin-left: 5px;
    color: #175959;

    &:focus, &:hover {
      border-color: #000000;
      border-width: 2px;
    }
  }

  .verbete-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }

  .rl-criar-verbete-definicao {
    width: 50vw;
    height: 30vh;
    margin-bottom: 50px;

    textarea {
      width: 100%;
      height: 100%;
      padding: 10px;
      outline: none !important;
      resize: none;
    }
  }

  .rl-criar-verbete-categorias {
    margin-bottom: 20px;

    &__categoria {
      margin-bottom: 15px;
    }

    select {
      height: 30px;
      padding: 5px;
      background-color: #fafafa;
      border: none;
      border: 1px solid #bdbdbd;
      border-radius: 5px;
    }
  }
}
</style>
