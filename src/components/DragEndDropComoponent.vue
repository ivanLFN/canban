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
              <v-tooltip text="Sort by Rating">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    @click="sortByRating(1)"
                    class="btn-classic me-3"
                    elevation="0"
                    dense
                    style="padding: 0px; min-width: 30px;"
                  >
                    <img class="w-100" style="width: 30px; height: 30px;" src="/images/icons8-sort-50.png" alt="Image Description">
                  </v-btn>
                </template>
              </v-tooltip>
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
                        <v-combobox v-model="formItem.category" label="Category" :items="categories"></v-combobox>
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
            class="drag-item mt-5"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
          <v-card
            class="mx-auto"
            max-width="344"
            style="padding-top: 20px;"
          >
            <v-img
              height="200px"
              :src="item.imageUrl"
            ></v-img>

            <v-card-title class="title text-left">
              {{ item.title }}
            </v-card-title>


            <v-card-subtitle class="text-left">{{ item.category }}</v-card-subtitle>
            <v-card-text class="text-left">
              <div>ID: {{ item.id }}</div>
              <div>Price: {{ item.price }}</div>
              <div>Rating: {{ item.rating }}</div>
              <div>Points: {{ item.points }}</div>
            </v-card-text>

            <v-card-actions>
              <v-dialog v-model="editDialog" max-width="600">
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="editItem(item)" v-bind="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>Edit Item</v-card-title>
                  <v-card-text>
                    <v-form @submit.prevent="updateData">
                      <v-text-field v-model="selectedItem.imageUrl" label="Image URL"></v-text-field>
                      <v-text-field v-model="selectedItem.title" label="Title"></v-text-field>
                      <v-text-field v-model="selectedItem.desc" label="Description"></v-text-field>
                      <v-combobox v-model="selectedItem.category" label="Category" :items="categories"></v-combobox>
                      <v-text-field v-model="selectedItem.price" label="Price"></v-text-field>
                      <v-text-field v-model="selectedItem.rating" label="Rating"></v-text-field>
                      <v-text-field v-model="selectedItem.points" label="Points"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" @click="updateData">Save</v-btn>
                    <v-btn @click="editDialog = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="item.show = !item.show"
              ></v-btn>
              <v-btn icon @click="prevItem(item.id)"><v-icon>mdi-chevron-left</v-icon></v-btn>
              <v-btn icon @click="nextItem(item.id)"><v-icon>mdi-chevron-right</v-icon></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="item.show">
                <v-divider></v-divider>

                <v-card-text>
                  {{ item.desc }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
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
              <v-tooltip text="Sort by Rating">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    @click="sortByRating(2)"
                    class="btn-classic me-3"
                    elevation="0"
                    dense
                    style="padding: 0px; min-width: 30px;"
                  >
                    <img class="w-100" style="width: 30px; height: 30px;" src="/images/icons8-sort-50.png" alt="Image Description">
                  </v-btn>
                </template>
              </v-tooltip>
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
                        <v-combobox v-model="formItem.category" label="Category" :items="categories"></v-combobox>
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
            class="drag-item mt-5"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
          <v-card
            class="mx-auto"
            max-width="344"
            style="padding-top: 20px;"
          >
            <v-img
              height="200px"
              :src="item.imageUrl"
            ></v-img>

            <v-card-title class="title text-left">
              {{ item.title }}
            </v-card-title>


            <v-card-subtitle class="text-left">{{ item.category }}</v-card-subtitle>
            <v-card-text class="text-left">
              <div>ID: {{ item.id }}</div>
              <div>Price: {{ item.price }}</div>
              <div>Rating: {{ item.rating }}</div>
              <div>Points: {{ item.points }}</div>
            </v-card-text>

            <v-card-actions>
              <v-dialog v-model="editDialog" max-width="600">
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="editItem(item)" v-bind="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>Edit Item</v-card-title>
                  <v-card-text>
                    <v-form @submit.prevent="updateData">
                      <v-text-field v-model="selectedItem.imageUrl" label="Image URL"></v-text-field>
                      <v-text-field v-model="selectedItem.title" label="Title"></v-text-field>
                      <v-text-field v-model="selectedItem.desc" label="Description"></v-text-field>
                      <v-combobox v-model="selectedItem.category" label="Category" :items="categories"></v-combobox>
                      <v-text-field v-model="selectedItem.price" label="Price"></v-text-field>
                      <v-text-field v-model="selectedItem.rating" label="Rating"></v-text-field>
                      <v-text-field v-model="selectedItem.points" label="Points"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" @click="updateData">Save</v-btn>
                    <v-btn @click="editDialog = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="item.show = !item.show"
              ></v-btn>
              <v-btn icon @click="prevItem(item.id)"><v-icon>mdi-chevron-left</v-icon></v-btn>
              <v-btn icon @click="nextItem(item.id)"><v-icon>mdi-chevron-right</v-icon></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="item.show">
                <v-divider></v-divider>

                <v-card-text>
                  {{ item.desc }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
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
              <v-tooltip text="Sort by Rating">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    @click="sortByRating(3)"
                    class="btn-classic me-3"
                    elevation="0"
                    dense
                    style="padding: 0px; min-width: 30px;"
                  >
                    <img class="w-100" style="width: 30px; height: 30px;" src="/images/icons8-sort-50.png" alt="Image Description">
                  </v-btn>
                </template>
              </v-tooltip>
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
                        <v-combobox v-model="formItem.category" label="Category" :items="categories"></v-combobox>
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
            class="drag-item mt-5"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
          <v-card
            class="mx-auto"
            max-width="344"
            style="padding-top: 20px;"
          >
            <v-img
              height="200px"
              :src="item.imageUrl"
            ></v-img>

            <v-card-title class="title text-left">
              {{ item.title }}
            </v-card-title>


            <v-card-subtitle class="text-left">{{ item.category }}</v-card-subtitle>
            <v-card-text class="text-left">
              <div>ID: {{ item.id }}</div>
              <div>Price: {{ item.price }}</div>
              <div>Rating: {{ item.rating }}</div>
              <div>Points: {{ item.points }}</div>
            </v-card-text>

            <v-card-actions>
              <v-dialog v-model="editDialog" max-width="600">
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="editItem(item)" v-bind="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>Edit Item</v-card-title>
                  <v-card-text>
                    <v-form @submit.prevent="updateData">
                      <v-text-field v-model="selectedItem.imageUrl" label="Image URL"></v-text-field>
                      <v-text-field v-model="selectedItem.title" label="Title"></v-text-field>
                      <v-text-field v-model="selectedItem.desc" label="Description"></v-text-field>
                      <v-combobox v-model="selectedItem.category" label="Category" :items="categories"></v-combobox>
                      <v-text-field v-model="selectedItem.price" label="Price"></v-text-field>
                      <v-text-field v-model="selectedItem.rating" label="Rating"></v-text-field>
                      <v-text-field v-model="selectedItem.points" label="Points"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" @click="updateData">Save</v-btn>
                    <v-btn @click="editDialog = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="item.show = !item.show"
              ></v-btn>
              <v-btn icon @click="prevItem(item.id)"><v-icon>mdi-chevron-left</v-icon></v-btn>
              <v-btn icon @click="nextItem(item.id)"><v-icon>mdi-chevron-right</v-icon></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="item.show">
                <v-divider></v-divider>

                <v-card-text>
                  {{ item.desc }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
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
    const editDialog = ref(false);
    const selectedItem = ref({});

    const categories = reactive([
      "men's clothing",
      "jewelery",
      "electronics",
      "women's clothing"
    ])

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
            imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            points: 120,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            desc: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: "men's clothing",
            price: '$109.95',
            rating: 3.9,
            list: '1',
            show: false
          },
          {
            id: '2',
            imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
            points: 259,
            title: 'Mens Casual Premium Slim Fit T-Shirts ',
            desc: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
            category: "men's clothing",
            price: '$22.3',
            rating: 4.1,
            list: '1',
            show: false
          },
          {
            id: '3',
            imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
            points: 500,
            title: 'Mens Cotton Jacket',
            desc: 'High-quality wireless headphones with noise-canceling technology.',
            category: 'electronics',
            price: '$55.99',
            rating: 4.8,
            list: '1',
            show: false
          },
          {
            id: '4',
            imageUrl: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
            points: 430,
            title: 'Mens Casual Slim Fit',
            desc: 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
            category: "men's clothing",
            price: '$15.99',
            rating: 2.1,
            list: '2',
            show: false
          },
          {
            id: '5',
            imageUrl: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
            points: 695,
            title: 'John Hardy Women`s Legends Naga Gold & Silver Dragon Station Chain Bracelet',
            desc: 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean`s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.',
            category: 'Shoes',
            price: '$59.99',
            rating: 4.6,
            list: '3',
            show: false
          },
          {
            id: '6',
            imageUrl: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
            points: 695,
            title: 'Solid Gold Petite Micropave ',
            desc: 'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
            category: 'Shoes',
            price: '$168',
            rating: 3.9,
            list: '2',
            show: false
          }
        ];
      }
    }

    const prevItem = (itemId) => {
      const index = responseData.value.findIndex(item => item.id === itemId);
      if (index !== -1) {
        const currentList = parseInt(responseData.value[index].list);
        const prevList = currentList === 1 ? 3 : currentList - 1;
        responseData.value[index].list = prevList.toString();
      }
    };

    const nextItem = (itemId) => {
      const index = responseData.value.findIndex(item => item.id === itemId);
      if (index !== -1) {
        const currentList = parseInt(responseData.value[index].list);
        const nextList = currentList === 3 ? 1 : currentList + 1;
        responseData.value[index].list = nextList.toString();
      }
    };


    const editItem = (item) => {
      selectedItem.value = { ...item };
      editDialog.value = true;
    };

    const updateData = () => {
      const index = responseData.value.findIndex(item => item.id === selectedItem.value.id);

      if (index !== -1) {
        Object.assign(responseData.value[index], selectedItem.value);
      }

      editDialog.value = false;
    };

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

    const sortByRating = (column) => {
      const listItems = responseData.value.filter((item) => item.list === column);
      listItems.sort((a, b) => b.rating - a.rating);
      listItems.forEach((item, index) => {
        const originalIndex = responseData.value.findIndex((i) => i.id === item.id);
        responseData.value.splice(originalIndex, 1);
        responseData.value.splice(index, 0, item);
      });
    };

    return {
      responseData,
      formItem,
      saveData,
      getList,
      startDrag,
      onDrop,
      sortByRating,
      categories,
      editDialog,
      editItem,
      updateData,
      selectedItem,
      prevItem,
      nextItem
    };
  }
}
</script>

<style>

.title {
  overflow: visible;
}

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
  color: white;
  margin-bottom: 10px;
}

.title {
  white-space: normal;
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
