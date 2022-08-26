<template>
  <div class="TodoView">
    <div class="page-title d-flex">
      <h2 class="my-auto">{{ state.list.name }}</h2>
    </div>
    <template v-if="state.loading">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </template>
    <template v-if="!state.loading">
      <button
        @click="addItem"
        :disabled="state.loading"
        class="btn btn-primary rounded-pill"
      >
        <div
          class="spinner-border text-light"
          v-if="state.loading"
          role="status"
        ></div>
        Adicionar Item
      </button>
      <ItemTodo
        v-for="(item, index) in itensToDo"
        :key="`${item?.id}-${index}`"
        :item="item"
        :listId="listId"
        @updateToDo="updateTodo($event)"
      />
    </template>
    <p class="error mt-5" v-if="state.error">{{ state.error }}</p>
  </div>
</template>

<script>
import { reactive, onBeforeMount, computed } from 'vue';
import ItemTodo from '@/components/Molecules/ItemTodo.vue';
import useStore from '@/hooks/useStore';
import services from '@/services';
import { useRouter } from 'vue-router';
import { setTodo, newTodoItem, updateTodoItem } from '@/store/todos';

export default {
  name: 'TodoView',
  components: {
    ItemTodo,
  },
  setup() {
    const router = useRouter();
    const listId = router.currentRoute.value.params.listId;
    const store = useStore();
    const state = reactive({
      itemsTodo: [],
      list: {},
      error: null,
      loading: false,
    });

    onBeforeMount(async () => {
      state.error = null;
      state.loading = true;

      const response = await services.todos.getUserTodo(listId);
      if (response.data && response.data.list) {
        state.list = response.data.list;
        state.itemsTodo = response.data.list.itens;
        setTodo([response.data.list]);
      } else if (response.data.message) {
        state.error = response.data.message;
      }
      state.loading = false;
    });

    async function addItem() {
      const item = {
        id: `NewItem-${Math.floor(Math.random() * Date.now())}`,
        user_id: state.userID,
        name: '',
        checked: false,
        edit: true,
      };
      newTodoItem(listId, item);
    }

    async function updateTodo(itemUpdate) {
      const listUpdate = updateTodoItem(listId, itemUpdate);
      await services.todos.updateTodo(listId, listUpdate);
    }

    const itensToDo = computed(() => {
      const list = store.Todos.allTodos.filter((e) => e?._id == listId)[0];
      const itens = list?.itens ? list?.itens : [];
      return itens;
    });

    return {
      store,
      state,
      addItem,
      listId,
      updateTodo,
      itensToDo,
    };
  },
};
</script>

<style>
.TodoView {
  margin-bottom: 55px;
}
.page-title {
  padding-left: 16px;
  padding-right: 16px;
  height: 53px;
}
.page-title h2 {
  font-weight: 700;
  font-size: 1.25rem;
  text-align: left;
}
.error {
  color: #ef6a6a;
}
</style>
