<script lang="ts">
  import Loading from "./components/Loading.svelte";

  import UploadFile from "./components/UploadFile.svelte";
  // Futur update to get the list of the last image updated
  // let listImages: string[] = [];
  // const fetchImages = async () => {
  //   const response = await fetch("http://localhost:3000/api/images");
  //   if (!response.ok) {
  //     // Notif something wrong happen
  //     alert("Cannot fetch images");
  //   }
  //   listImages = await response.json();
  // };
  // onMount(() => {
  //   fetchImages();
  // });
</script>

<main class="grid place-items-center h-screen w-screen">
  <Loading />
  <UploadFile />
  <!-- Futur update list last images updated -->
  <!-- <div class="w-screen flex gap-4"> -->
  <!--   {#if listImages.length} -->
  <!--     {#each listImages as image} -->
  <!--       <div class="w-52 h-48"> -->
  <!--         <img src={`http://localhost:3000/files/${image}`} alt="plop" /> -->
  <!--       </div> -->
  <!--     {/each} -->
  <!--   {:else} -->
  <!--     <div>No Images yet</div> -->
  <!--   {/if} -->
  <!-- </div> -->
</main>

<style lang="postcss">
  :root {
    --svelte-rgb: 255, 62, 0;
  }

  h1 {
    color: rgb(var(--svelte-rgb));
  }

  .with-border {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='21' ry='21' stroke='%239FC2F5FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='6' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 21px;
  }
</style>
