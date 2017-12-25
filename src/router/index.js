import Vue from 'vue'
import Router from 'vue-router'
import BooksList from '@/components/BooksList'
import CreateBook from '@/components/CreateBook'
import DetailBook from '@/components/DetailBook'
import EditBook from '@/components/EditBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BooksList',
      component: BooksList
    },
    {
      path: '/create',
      name: 'CreateBook',
      component: CreateBook
    },
    {
      path: '/detail/:id',
      name: 'DetailBook',
      component: DetailBook
    },
    {
      path: '/edit/:id',
      name: 'EditBook',
      component: EditBook
    }
  ]
})
