<script>
  export let valor = '0';
</script>

<input type="text" bind:value = {valor} readonly />

<style>
  input {
    width: 100%;

    font-size: 20px;
    text-align: right;

    margin-bottom: 10px;
    padding: 10px;

    border: 2px solid hotpink;
    border-radius: 8px;
  }
</style>
