<template>
  <div>
    <h1>Edit book</h1>
    <form>
      <div class="row">
        <div class="col-4 offset-4">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" name="title" id="title" v-model="book.title"
                   v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('title') }">
            <span v-show="errors.has('title')" class="help">{{ errors.first('title') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="author">Author</label>
            <select id="author" name="author" class="form-control" v-model="book.author.id"
                    v-validate="'required'"
                    :class="{'input': true, 'is-danger': errors.has('author') }">
              <option v-for="(author, index) in authors" v-bind:value="author.id">
                {{ author.name }}
              </option>
            </select>
            <span v-show="errors.has('author')" class="help">{{ errors.first('author') }}</span>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="genre">Genre</label>
            <select name="genre" id="genre" class="form-control" v-model="book.genre.id"
                    v-validate="'required'"
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
            <select name="language" id="language" class="form-control" v-model="book.language.id"
                    v-validate="'required'"
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
            <input type="text" id="isbnnumber" name="isbnnumber" class="form-control" v-model="book.ISBNNumber"
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
            <flat-pickr :config="datePickerConfig" v-model="book.publicationDate" id="publicationDate"
                        name="publicationDate"
                        class="form-control" v-validate="'required'"
                        :class="{'input': true, 'is-danger': errors.has('publicationDate') }"></flat-pickr>
            <span v-show="errors.has('publicationDate')" class="help">{{ errors.first('publicationDate') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button class="btn btn-outline-primary btn-block" type="button" v-on:click="bookPut">
            Update
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
    name: 'edit-book',
    data () {
      return {
        book: {
          title: null,
          author: {
            id: 1
          },
          genre: {
            id: 1
          },
          language: {
            id: 1
          },
          publicationDate: null,
          ISBNNumber: null
        },
        authors: null,
        genres: null,
        languages: null,
        datePickerConfig: {
          altFormat: 'Y-m-d',
          altInput: true,
          dateFormat: 'Y-m-d H:m:ss'
        }
      }
    },
    methods: {
      bookPut: function () {
        this.$validator.validateAll()
          .then((result) => {
            if (!result) {
              return false
            }
            let file = this.$refs.file.files[0]
            let data = new FormData()
            data.append('book_update[imageFile]', file)
            data.append('book_update[title]', this.book.title)
            data.append('book_update[publicationDate]', this.book.publicationDate)
            data.append('book_update[ISBNNumber]', this.book.ISBNNumber)
            data.append('book_update[author]', this.book.author.id)
            data.append('book_update[genre]', this.book.genre.id)
            data.append('book_update[language]', this.book.language.id)
            data.set('_method', 'put')
            this.$http.post('api/books/' + this.$route.params.id, data, {
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
              })
              .catch(e => {
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
      this.$http.get('api/books/' + this.$route.params.id)
        .then(response => {
          this.book = response.data
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
