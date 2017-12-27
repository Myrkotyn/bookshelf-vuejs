<template>
  <div class="books-list">
    <h1>{{ msg }}</h1>
    <div class="row" style="margin-bottom: 10px;">
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-10"><input type="text" placeholder="Search..." class="form-control" v-model="search"
                                        v-on:keyup.enter="searchBook"></div>
          <div class="col-md-2">
            <button class="btn btn-default" v-on:click="searchBook">Go</button>
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
            <th>image</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(book, index) in books" v-bind:class="{'active': activeIndex === index}"
              v-on:mouseover="mouseOver(book, index)"
              v-on:mouseleave="mouseLeave()" v-on:click="detailView(book.id)">
            <td>
              <router-link :to="{name: 'DetailBook', params: {id: book.id}}" class="row-link">{{ book.title }}
                <router-link :to="{ name: 'EditBook', params: { id: book.id } }"><i class="far fa-edit"></i>
                </router-link>
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
            <td>
              <router-link :to="{name: 'DetailBook', params: {id: book.id}}" class="row-link">
                <img :src="imagePath(book.imageName)" alt="" class="image">
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <paginate
          :page-count="paginatorPageCount"
          :click-handler="updateBooksResource"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'list-inline'"
          :page-class="'list-inline-item'"
          :prev-class="'list-inline-item'"
          :next-class="'list-inline-item'">
        </paginate>
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
        books: [],
        paginatorPageCount: 1,
        search: '',
        showImage: false
      }
    },
    methods: {
      searchBook: function () {
        let page = 1
        this.loadBooks(page, this.search)
      },
      updateBooksResource: function (page) {
        this.loadBooks(page, this.search)
      },
      imagePath: function (imageName) {
        return process.env.API + 'uploads/images/books/' + imageName
      },
      mouseOver: function (val, index) {
        this.activeIndex = index
      },
      mouseLeave: function () {
        this.activeIndex = null
      },
      detailView: function (bookId) {
      },
      loadBooks: function (page = 1, search = '') {
        this.$http.get('api/books?page=' + page + '&search=' + search)
          .then(response => {
            this.books = response.data.books
            this.paginatorPageCount = response.data.paginatorCount
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    created () {
      this.loadBooks()
    }
  }
</script>

<style>
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

  .list-inline li {
    width: 60px;
  }

  .list-inline .list-inline-item.active {
    border-radius: 5px;
    background-color: #2651ca;
  }

  .list-inline .list-inline-item.active a {
    color: white;
  }

  .list-inline li a:focus {
    outline: none;
  }

  .pagination li a {
    color: black;
    padding: 8px 16px;
    text-decoration: none;
  }
  img.image {
    max-width: 150px;
  }
  .disabled {
    display: none;
  }
</style>
