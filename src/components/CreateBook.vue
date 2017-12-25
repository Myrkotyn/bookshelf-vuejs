<template>
  <div>
    <h1>{{ msg }}</h1>
    <form>
      <div class="row">
        <div class="col-4 offset-4">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" name="title" id="title" v-model="data.book.title"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('title') }">
            <span v-show="errors.has('title')" class="help">{{ errors.first('title') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="author">Author</label>
            <select id="author" name="author" class="form-control" v-model="author" v-validate="'required'"
                    :class="{'input': true, 'is-danger': errors.has('author') }">
              <option v-for="author in authors" v-bind:value="author.id">
                {{ author.name }}
              </option>
            </select>
            <span v-show="errors.has('author')" class="help">{{ errors.first('author') }}</span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="genre">Genre</label>
            <select name="genre" id="genre" class="form-control" v-model="genre" v-validate="'required'"
                    :class="{'input': true, 'is-danger': errors.has('genre') }">
              <option v-for="genre in genres" v-bind:value="genre.id">
                {{ genre.name }}
              </option>
            </select>
            <span v-show="errors.has('genre')" class="help">{{ errors.first('genre') }}</span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="language">Language</label>
            <select name="language" id="language" class="form-control" v-model="language" v-validate="'required'"
                    :class="{'input': true, 'is-danger': errors.has('language') }">
              <option v-for="language in languages" v-bind:value="language.id">
                {{ language.name }}
              </option>
            </select>
            <span v-show="errors.has('language')" class="help">{{ errors.first('language') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="isbnnumber">ISBN number</label>
            <input type="text" id="isbnnumber" name="isbnnumber" class="form-control" v-model="data.book.ISBNNumber"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('isbnnumber') }">
            <span v-show="errors.has('isbnnumber')" class="help">{{ errors.first('isbnnumber') }}</span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="imageFile">Image</label>
            <input type="file" class="form-control" id="imageFile" name="imageFile" ref="file" v-validate="'required'"
                   :class="{'input': true, 'is-danger': errors.has('imageFile') }">
            <span v-show="errors.has('imageFile')" class="help">{{ errors.first('imageFile') }}</span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="publicationDate">Publication date</label>
            <flat-pickr :config="datePickerConfig" v-model="data.book.publicationDate" id="publicationDate"
                        name="publicationDate"
                        class="form-control" v-validate="'required'"
                        :class="{'input': true, 'is-danger': errors.has('publicationDate') }"></flat-pickr>
            <span v-show="errors.has('publicationDate')" class="help">{{ errors.first('publicationDate') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button class="btn btn-outline-primary btn-block" type="button" v-on:click="bookPost">
            Create
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'

  export default {
    name: 'book',
    data () {
      return {
        msg: 'Create book',
        data: {
          book: {
            title: '',
            publicationDate: '',
            ISBNNumber: '',
            imageFile: ''
          }
        },
        author: null,
        authors: null,
        genre: null,
        genres: null,
        language: null,
        languages: null,
        datePickerConfig: {
          altFormat: 'Y-m-d',
          altInput: true,
          dateFormat: 'Y-m-d H:m:ss'
        }
      }
    },
    methods: {
      bookPost: function () {
        this.$validator.validateAll()
          .then((result) => {
            if (!result) {
              return false
            }
            let file = this.$refs.file.files[0]
            let data = new FormData()
            data.append('book[imageFile]', file)
            data.append('book[title]', this.data.book.title)
            data.append('book[publicationDate]', this.data.book.publicationDate)
            data.append('book[ISBNNumber]', this.data.book.ISBNNumber)
            this.$http.post('api/books/' + this.author + '/' + this.genre + '/' + this.language, data, {
              body: data,
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              emulateJSON: true
            })
              .then(response => {
                this.$router.push({
                  name: 'DetailBook',
                  params: {id: response.body.id}
                })
              }, e => {
                console.log(e)
              })
          })
      }
    },
    created () {
      this.$http.get('api/authors')
        .then(response => {
          this.authors = response.data
        })
        .catch(e => {
          console.log(e)
        })
      this.$http.get('api/genres')
        .then(response => {
          this.genres = response.data
        })
        .catch(e => {
          console.log(e)
        })
      this.$http.get('api/languages')
        .then(response => {
          this.languages = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    components: {
      flatPickr
    }
  }
</script>

<style scoped>
  .help {
    color: #ca3d3d;
  }

  .is-danger {
    border-color: #ca3d3d;
    box-shadow: 0 0 0 0.2rem rgba(255, 0, 18, 0.25)
  }
</style>
