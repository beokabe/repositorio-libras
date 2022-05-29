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
          placeholder="Insira o título do verbete"
          v-model="verbeteNome"
        />
        <div class="upload-file">
          <label for="verbete-photo">Baixar Background</label>
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
            :class="{ 'button-inactive': !this.$store.state.verbeteImagemFileURL }"
          >
            Pré-visualizar
          </button>
          <span>Arquivo: {{ this.$store.state.verbeteImagemName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="verbeteDefinicao"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="verbete-actions">
        <button @click="uploadBlog">Publicar</button>
        <router-link class="router-button" :to="{ name: 'VerbetePreview' }"
          >Pré-visualizar</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
import firebase from 'firebase/app';
import 'firebase/storage';
import db from '../firebase/firebaseInit';

import VerbeteCoverPreview from '../components/VerbeteCoverPreview.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';

window.Quill = Quill;

const ImageResize = require('quill-image-resize-module').default;

Quill.register('modules/imageResize', ImageResize);

export default {
  name: 'CriarVerbete',
  data() {
    return {
      file: null,
      error: '',
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
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
      const firstFile = this.$refs.blogPhoto.files[0];
      this.file = firstFile;

      const fileName = this.file.name;

      this.$store.commit('fileNameChange', fileName);
      this.$store.commit('createFileURL', URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit('openPhotoPreview');
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);

      docRef.put(file).on(
        'state_changed',
        (snapshot) => {
          // TODO 1 - [AJUSTE] Responder mostrando uma mensagem de sucesso
          console.log(snapshot);
        },
        (err) => {
          // TODO 2 - [AJUSTE] Responder mostrando uma mensagem de erro acessível
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, 'image', downloadURL);
          resetUploader();
        }
      );
    },

    uploadBlog() {
      if (this.verbeteNome.length > 0 && this.verbeteDefinicao.length > 0) {
        if (this.file) {
          this.loading = true;

          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/VerbeteImagem/${this.$store.state.verbeteImagemName}`
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
                verbeteDefinicao: this.verbeteDefinicao,
                verbeteImagem: downloadURL,
                verbeteImagemNome: this.verbeteImagemNome,
                verbeteNome: this.verbeteNome,
                profileId: this.profileId,
                date: timestamp,
              });
              await this.$store.dispatch('getPost');

              this.loading = false;
              this.$router.push({
                name: 'VerVerbete',
                params: { verbeteid: dataBase.id },
              });
            }
          );
          return;
        }

        this.error = true;
        this.errorMsg =
          'Por favor verifique se foi selecionado um background para o artigo.';
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }

      this.error = true;
      this.errorMsg =
        'Por favor verifique se o título e o conteúdo do arquivo estão preenchidos.';
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },

    verbeteImagemNome() {
      return this.$store.state.verbeteImagemNome;
    },

    verbeteNome: {
      get() {
        return this.$store.state.verbeteNome;
      },
      set(payload) {
        this.$store.commit('updateBlogTitle', payload);
      },
    },

    verbeteDefinicao: {
      get() {
        return this.$store.state.verbeteDefinicao;
      },
      set(payload) {
        this.$store.commit('newVerbete', payload);
      },
    },
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
  label,
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
    margin-bottom: 10px;
    background-color: #303030;
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
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .verbete-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>
