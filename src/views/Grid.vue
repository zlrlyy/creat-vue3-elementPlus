<template>
  <div class="grid">
    <div class="row1-col1">1</div>
    <div class="row1-col2">2</div>
    <div class="row1-col3">3</div>
    <div class="row2-col1">4</div>
    <div class="row2-col2">5</div>
    <div class="row2-col3">6</div>
    <div class="row3-col1">7</div>
    <div class="row3-col2">8</div>
    <div class="row3-col3">9</div>
  </div>
</template>
<style>
.grid{
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(4,200px);
  gap: 20px;
  justify-content:center;
}

.row1-col1{
 
  background-color:cornflowerblue;
}
.row1-col2{
  grid-column-start: span 2;
  background-color: pink;
}
.row1-col3{
  background-color:antiquewhite;
}
.row2-col1{
  background-color: bisque;
}
.row2-col2{
  background-color: azure;
}
.row2-col3{
  background-color:aliceblue;
}
.row3-col1{
  background-color: bisque;
}
.row3-col2{
  background-color: azure;
}
.row3-col3{
  background-color:aliceblue;
}
</style>