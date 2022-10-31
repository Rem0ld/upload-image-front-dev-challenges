<script lang="ts">
  import Loading from "./components/Loading.svelte";
  import UploadFile from "./components/UploadFile.svelte";

  let visible = false;
  let file: string;
  let error: string;

  const postImage = async (event: any) => {
    visible = !visible;
    const formData = new FormData();
    formData.append("file", event.detail.data);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DEV_URL}api/images/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(await response.json());
      }
      file = await response.json();
    } catch (error) {
      error = error.message;
    }
    visible = !visible;
    return;
  };
</script>

<main class="grid place-items-center h-screen w-screen">
  <div>
    {#if visible}
      <Loading />
    {:else}
      <UploadFile {file} {error} on:postImage={postImage} />
    {/if}
  </div>
</main>
