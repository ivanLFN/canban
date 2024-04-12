<template>
  <v-container>
    <h1 class="title text-left"><span style="color: #42b983;">Canban</span> work board</h1>
    <v-row justify="center" class="mt-5">
      <v-col
        :cols="12"
        :sm="2"
        v-if="responseData !== null"
        class="me-5"
      >
        <div
          class="drop-component"
          @drop="onDrop($event, 1)"
          @dragenter.prevent
          @dragover.prevent
        >
          <div class="text-left d-flex align-center">
            <p
              class="drop-title"
              style="background-color: #caedf3;"
            >
              New
            </p>
            <div class="w-100 text-end">
              <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorNewItemProps }">
                  <v-btn
                    v-bind="activatorNewItemProps"
                    class="btn-classic"
                    elevation="0"
                    dense
                    style="padding: 0px; min-width: 30px;"
                  >
                    <img class="w-100" style="width: 30px; height: 30px;" src="/images/icons8-add-50.png" alt="Image Description">
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Add new item" style="background-color: white;">
                    <v-card-text>
                      <v-form @submit.prevent="saveData(1)">
                        <v-text-field v-model="formItem.img_url" label="Image URL"></v-text-field>
                        <v-text-field v-model="formItem.title" label="Title"></v-text-field>
                        <v-text-field v-model="formItem.desc" label="Description"></v-text-field>
                        <v-text-field v-model="formItem.category" label="Category"></v-text-field>
                        <v-text-field v-model="formItem.price" label="Price"></v-text-field>
                        <v-text-field v-model="formItem.rating" label="Rating"></v-text-field>
                        <v-text-field v-model="formItem.points" label="Points"></v-text-field>

                        <v-card-actions>
                          <v-btn type="submit" color="#42b983" @click="isActive.value = false">Save</v-btn>
                          <v-btn text @click="isActive.value = false">Close</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </div>
          <div
            v-for="item in getList(1)"
            :key="item.id"
            class="drag-item"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            {{ item.title }}
          </div>
        </div>
      </v-col>
      <v-col
        :cols="12"
        :sm="2"
        v-if="responseData !== null"
        class="me-5"
      >
        <div
          class="drop-component"
          @drop="onDrop($event, 2)"
          @dragenter.prevent
          @dragover.prevent
        >
          <div class="text-left d-flex align-center">
            <p
              class="drop-title"
              style="background-color: #f4e6c3;"
            >
              Process
            </p>
            <div class="w-100 text-end">
              <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorNewItemProps }">
                  <v-btn
                    v-bind="activatorNewItemProps"
                    class="btn-classic"
                    elevation="0"
                    dense
                    style="padding: 0px; min-width: 30px;"
                  >
                    <img class="w-100" style="width: 30px; height: 30px;" src="/images/icons8-add-50.png" alt="Image Description">
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Add new item" style="background-color: white;">
                    <v-card-text>
                      <v-form @submit.prevent="saveData(2)">
                        <v-text-field v-model="formItem.img_url" label="Image URL"></v-text-field>
                        <v-text-field v-model="formItem.title" label="Title"></v-text-field>
                        <v-text-field v-model="formItem.desc" label="Description"></v-text-field>
                        <v-text-field v-model="formItem.category" label="Category"></v-text-field>
                        <v-text-field v-model="formItem.price" label="Price"></v-text-field>
                        <v-text-field v-model="formItem.rating" label="Rating"></v-text-field>
                        <v-text-field v-model="formItem.points" label="Points"></v-text-field>

                        <v-card-actions>
                          <v-btn type="submit" color="#42b983" @click="isActive.value = false">Save</v-btn>
                          <v-btn text @click="isActive.value = false">Close</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </div>
          <div
            v-for="item in getList(2)"
            :key="item.id"
            class="drag-item"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            {{ item.title }}
          </div>
        </div>
      </v-col>
      <v-col
        :cols="12"
        :sm="2"
        v-if="responseData !== null"
        class="me-5"
      >
        <div
          class="drop-component"
          @drop="onDrop($event, 3)"
          @dragenter.prevent
          @dragover.prevent
        >
          <div class="text-left d-flex align-center">
            <p
              class="drop-title"
              style="background-color: #c6f1df;"
            >
              Done
            </p>
            <div class="w-100 text-end">
              <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorNewItemProps }">
                  <v-btn
                    v-bind="activatorNewItemProps"
                    class="btn-classic"
                    elevation="0"
                    dense
                    style="padding: 0px; min-width: 30px;"
                  >
                    <img class="w-100" style="width: 30px; height: 30px;" src="/images/icons8-add-50.png" alt="Image Description">
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Add new item" style="background-color: white;">
                    <v-card-text>
                      <v-form @submit.prevent="saveData(3)">
                        <v-text-field v-model="formItem.img_url" label="Image URL"></v-text-field>
                        <v-text-field v-model="formItem.title" label="Title"></v-text-field>
                        <v-text-field v-model="formItem.desc" label="Description"></v-text-field>
                        <v-text-field v-model="formItem.category" label="Category"></v-text-field>
                        <v-text-field v-model="formItem.price" label="Price"></v-text-field>
                        <v-text-field v-model="formItem.rating" label="Rating"></v-text-field>
                        <v-text-field v-model="formItem.points" label="Points"></v-text-field>

                        <v-card-actions>
                          <v-btn type="submit" color="#42b983" @click="isActive.value = false">Save</v-btn>
                          <v-btn text @click="isActive.value = false">Close</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </div>
          <div
            v-for="item in getList(3)"
            :key="item.id"
            class="drag-item"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            {{ item.title }}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, reactive } from 'vue';
import axios from 'axios'

export default {
  setup() {
    const responseData = ref(null);

    const formItem = reactive({
      img_url: '',
      title: '',
      desc: '',
      category: '',
      price: '',
      rating: '',
      points: ''
    });

    async function fetchData() {
      try {
        const response = await axios.get('/api/store/cardItems');
        responseData.value = response.data;
      } catch (error) {
        console.error('Error:', error);
        responseData.value = [
          {
            id: '1',
            title: 'Blue T-Shirt',
            desc: 'Comfortable cotton t-shirt in a classic blue color.',
            category: 'Clothing',
            price: '$20.99',
            rating: 4.5,
            list: '1'
          },
          {
            id: '2',
            title: 'Black Jeans',
            desc: 'Slim-fit black jeans with a stretchy fabric for maximum comfort.',
            category: 'Clothing',
            price: '$29.99',
            rating: 4.2,
            list: '1'
          },
          {
            id: '3',
            title: 'Wireless Headphones',
            desc: 'High-quality wireless headphones with noise-canceling technology.',
            category: 'Electronics',
            price: '$99.99',
            rating: 4.8,
            list: '1'
          },
          {
            id: '4',
            title: 'Leather Wallet',
            desc: 'Genuine leather wallet with multiple card slots and a cash pocket.',
            category: 'Accessories',
            price: '$49.99',
            rating: 4.6,
            list: '2'
          },
          {
            id: '5',
            title: 'Running Shoes',
            desc: 'Lightweight running shoes with breathable mesh upper and cushioned sole.',
            category: 'Shoes',
            price: '$59.99',
            rating: 4.4,
            list: '3'
          }
        ];
      }
    }

    fetchData();

    const getList = (list) => {
      return responseData.value.filter((item) => item.list == list)
    }

    const startDrag = (event, item) => {
      console.log(item)
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)
    }

    const onDrop = (event, list) => {
      const itemID = event.dataTransfer.getData('itemID')
      const item = responseData.value.find((item) => item.id == itemID)
      item.list = list
    }

    const saveData = (list) => {
      responseData.value.push({
        ...formItem,
        id: responseData.value.length + 1,
        list: list
      });
      Object.keys(formItem).forEach(key => {
        formItem[key] = '';
      });
      const modal = document.querySelector('.v-dialog__content');
      if (modal) {
        modal.parentNode.removeChild(modal);
      }
    };

    return {
      responseData,
      formItem,
      saveData,
      getList,
      startDrag,
      onDrop
    };
  }
}
</script>

<style>

.btn-classic {
  background-color: rgb(233, 233, 233);
  border: none;
  
}

.input {
  background-color: white !important;
}

.drop-component {
  padding: 10px;
  min-height: 20px;
  height: 100%;
}

.drag-item {
  background-color: #3498db;
  color: white;
  margin-bottom: 10px;
}

.title {
  text-align: left;
}

.full-height {
  min-height: 70vh;
}

.drop-title {
  display: inline-block;
  padding: 5px 10px;
  font-weight: 600;
  border-radius: 5px;
}

</style>
