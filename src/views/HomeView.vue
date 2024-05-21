<script lang="ts" setup>
import { Tree } from 'element-plus/es/components/tree-v2/src/types';
import { ref } from 'vue'
function parseModuleData(inputStr) {
  const moduleData = {};
  const modulePattern = /<Module (.*?)>/;
  const functionPattern = /<Function (.*?)>/;

  const lines = inputStr.trim().split('\n');
  let currentModule = null;

  for (const line of lines) {
    if (line.startsWith('<Module ')) {
      const match = modulePattern.exec(line);
      currentModule = match[1];
      moduleData[currentModule] = {
        value: currentModule,
        label: currentModule,
        children: [],
      };
    } else if (line.startsWith('  <Function ')) {
      const match = functionPattern.exec(line);
      const functionName = match[1];
      const functionValue = `${currentModule}::${functionName}`;
      moduleData[currentModule].children.push({
        value: functionValue,
        label: functionName,
      });
    }
  }

  return Object.values(moduleData);
}

// JSON.stringify(moduleData, null, 2)


const value = ref()
const valueStrictly = ref()
const textarea = ref("")
const data = ref()
const func = () => {
  // console.log(value.value)
  data.value = parseModuleData(textarea.value);
}
const gen_cmd = () => {
  // console.log(value.value)
  let res = value.value.join(" ")
  res = "pytest " + res + " --html=index.html"
  console.log(res)
}
const defaultProps = {
  children: 'children',
  label: 'label',
}
const handleNodeClick = (data: Tree) => {
  console.log(data)
}
const mytree = ref()
const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log(data, checked, indeterminate)
  console.log(mytree.value.getCheckedNodes(true))
}
</script>

``
<template>
  <el-input
    v-model="textarea"
    style="width: 240px"
    :rows="2"
    type="textarea"
    placeholder="please input pytest discovery"
  />
  <el-tree
    ref="mytree"
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
    show-checkbox
    @check-change="handleCheckChange"
  />
  <el-tree-select
    v-model="value"
    :data="data"
    multiple
    :render-after-expand="false"
    show-checkbox
    style="width: 240px"
  />
  <el-button @click="func">generate tree</el-button>
  <el-button @click="gen_cmd">generate command</el-button>
</template>