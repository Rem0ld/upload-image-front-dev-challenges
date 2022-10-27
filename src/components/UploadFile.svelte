<script lang="ts">
  import image from "../assets/image.svg";

  let file: string, fileInput: HTMLInputElement;

  const postImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", image);
    const response = await fetch("http://localhost:3000/api/images/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Something went wrong");
    }
    const result = await response.json();
    return result;
  };

  const onFileSelected = async (
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    const image = e.currentTarget.files[0];
    file = await postImage(image);
  };
</script>

<div
  class="flex flex-col gap-6 items-center p-10 rounded-md text-center shadow-[1px_1px_10px_0_rgba(0,0,0,0.15)]"
>
  <h2 class="text-xl">Upload your image</h2>
  <p class="text-sm">File should be Jpeg, Png...</p>
  <form enctype="multipart/form-data" class="flex flex-col gap-4 items-center">
    <div
      class="with-border w-96 flex flex-col gap-12 items-center p-12  bg-slate-100 rounded-md"
    >
      <input
        class="hidden"
        type="file"
        name="file"
        accept="image/*"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileInput}
      />
      {#if file}
        <img src={`http://localhost:3000/files/${file}`} alt="file" />
      {:else}
        <img
          width="125"
          height="125"
          src={image}
          alt="logo"
          class="inline-block"
        />
      {/if}
      <p class="text-sm text-gray-400">Drag & drop your image here</p>
    </div>
    <p class="text-sm text-gray-400">Or</p>
    <button
      type="button"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:shadow-md hover:bg-blue-600"
      on:click={() => fileInput.click()}
      >Choose your file
    </button>
  </form>
</div>
