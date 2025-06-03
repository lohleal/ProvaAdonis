<script>
  export let onButtonClick;

  const keys = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', '=', 0, 'C', '/'];
</script>

<div class="buttons">
  {#each keys as key}
    <button on:click={() => onButtonClick(key)}>{key}</button>
  {/each}
</div>

<style>
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }

  button {
    font-size: 20px;

    padding: 20px;

    background: pink;
    color: white;

    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  button:hover {
    background: hotpink;
  }
</style>
