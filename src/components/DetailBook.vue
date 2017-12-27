<template>
  <div>
    <h1>
      Details view
    </h1>
    <div class="card text-center" v-if="book">
      <div class="card-header">
        Title - {{ book.title }}
      </div>
      <div class="card-body">
        <dl class="row">
          <dt class="col-sm-6">Author</dt>
          <dd class="col-sm-6">{{ book.author.name }}</dd>

          <dt class="col-sm-6">Genre</dt>
          <dd class="col-sm-6">{{ book.genre.name }}</dd>

          <dt class="col-sm-6">Language</dt>
          <dd class="col-sm-6">{{ book.language.name }}</dd>

          <dt class="col-sm-6">ISBN Number</dt>
          <dd class="col-sm-6">{{ book.ISBNNumber }}</dd>

          <dt class="col-sm-6">Image</dt>
          <dd class="col-sm-6"><img :src="imagePath()" alt="image" class="image"></dd>
        </dl>
        <router-link :to="{ name: 'EditBook', params: { id: book.id } }" class="btn btn-primary">Edit</router-link>
      </div>
      <div class="card-footer text-muted">
        Publication date - {{ book.publicationDate|date }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail-book',
    data () {
      return {
        book: null
      }
    },
    methods: {
      imagePath: function () {
        return process.env.API + 'uploads/images/books/' + this.book.imageName
      }
    },
    created () {
      this.$http.get('api/books/' + this.$route.params.id)
        .then(response => {
          this.book = response.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
</script>

<style>
  img.image {
    max-width: 150px;
  }
</style>
