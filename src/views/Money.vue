<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Tabs :dataSource="recordTypeList" :value.sync="record.type" />
    <Notes
      field-name="备注"
      placeholder="在这里输入备注"
      :value.sync="record.notes"
    />
    <Tags :value.sync="record.tags" />
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tags, Notes, Tabs, NumberPad },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    },
  },
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    if (
      !this.record.tags ||
      this.record.tags.length === 0 ||
      this.record.amount === 0
    ) {
      return window.alert("请选择标签并输入有效金额");
    }
    this.$store.commit("createRecord", this.record);
    this.record.notes = "";
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
