<template>
  <div class="books-list">
    <h1>{{ msg }}</h1>
    <div class="row" style="margin-bottom: 10px;">
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-10"><input type="text" placeholder="Search..." class="form-control"></div>
          <div class="col-md-2">
            <button class="btn btn-default">Go</button>
          </div>
        </div>
      </div>
      <div class="col-md-8">

      </div>
      <div class="col-md-1">
        <router-link to="/create"><i class="far fa-plus-square fa-2x"></i></router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered table-hover">
          <thead class="thead-dark">
          <tr>
            <th>title</th>
            <th>author</th>
            <th>genre</th>
            <th>language</th>
            <th>date</th>
            <th>isbn</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(book, index) in books" v-bind:class="{'active': activeIndex === index}"
              v-on:mouseover="mouseOver(book, index)"
              v-on:mouseleave="mouseLeave()" v-on:click="detailView(book.id)">
            <td>
              <router-link :to="{name: 'DetailBook', params: {id: book.id}}" class="row-link">{{ book.title }}
                <router-link :to="{ name: 'EditBook', params: { id: book.id } }"><i class="far fa-edit"></i></router-link>
              </router-link>

            </td>
            <td>
              <router-link :to="{name: 'DetailBook', params: {id: book.id}}" class="row-link">{{ book.author.name }}
              </router-link>
            </td>
            <td>
              <router-link :to="{name: 'DetailBook', params: {id: book.id}}" class="row-link">{{ book.genre.name }}
              </router-link>
            </td>
            <td>
              <router-link :to="{name: 'DetailBook', params: {id: book.id}}" class="row-link">{{ book.language.name }}
              </router-link>
            </td>
            <td>
              <router-link :to="{name: 'DetailBook', params: {id: book.id}}" class="row-link">{{ book.publicationDate |
                date
                }}
              </router-link>
            </td>
            <td>
              <router-link :to="{name: 'DetailBook', params: {id: book.id}}" class="row-link">{{ book.ISBNNumber }}
              </router-link>
            </td>
            <!--<td><img v-bind:src="imagePath(book.imageName)" alt=""></td>-->
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'books-list',
    data () {
      return {
        msg: 'Books list',
        activeIndex: null,
        books: []
      }
    },
    methods: {
      imagePath: function (imageName) {
        return 'http://bookshelf.work/uploads/images/books/' + imageName
      },
      mouseOver: function (val, index) {
        this.activeIndex = index
      },
      mouseLeave: function () {
        this.activeIndex = null
      },
      detailView: function (bookId) {
      }
    },
    created () {
      this.$http.get('api/books')
        .then(response => {
          this.books = response.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
</script>

<style scoped>
  .tooltip {
    text-decoration: none;
    position: relative;
  }

  .tooltip span {
    display: none;
  }

  .tooltip:hover span {
    display: block;
    position: fixed;
    overflow: hidden;
  }

  table tr td a.row-link {
    display: block;
    height: 100%;
    width: 100%;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  table tr td a.row-link:hover {
    text-decoration: none;
  }

  .row-link {
    color: black;
  }

  table tr td {
    padding: 0;
  }

  tr.active td a {
    color: #2651ca;
  }

</style>
