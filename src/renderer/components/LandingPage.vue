<template>
    <div class="content">
        <span class="margin-right">{{ dataModel.xdag_dataTime }}</span>
        <span class="margin-right">Price: {{ dataModel.xdag_dealPrice }}</span>
        <span class="margin-right">Buy0: {{ dataModel.xdag_buy0 }}</span>
        <span>Sell0: {{ dataModel.xdag_sell0 }}</span>
    </div>
</template>

<script>

  export default {
    name: 'landing-page',
    data() {
      return {
        dataModel: this.$dataEngine.agent
      }
    }

  }
</script>

<style>
    .content {
        color: lightgrey;
        font-size: 14px;
    }

    .margin-right {
        margin-right: 10px;
    }

</style>
