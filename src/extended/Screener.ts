import { RemovableRef, useStorage } from '@vueuse/core';

export interface Item{
    label:string
    value:string
}

export class Futu_Cache {
    data:RemovableRef<Item[]>;

    constructor(){
        this.data = useStorage<Item[]>('oit-futu-screener', []);
    }

    addItem = (newItem: Item) => {
        if (!Array.isArray(this.data.value)) {
            this.data.value = [];
        }

        const index = this.data.value.findIndex(item => item.label === newItem.label);

        if (index === -1) {
            this.data.value.push(newItem);
        } else {
            this.data.value[index].value = newItem.value;
        }
    }

    removeItem = (label: string) => {
        if (!Array.isArray(this.data.value)) {
            this.data.value = [];
        }
        this.data.value = this.data.value.filter(item => item.label !== label);
    }
}



