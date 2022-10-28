<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import image from "../assets/image.svg";
  import FaCheckCircle from "svelte-icons/fa/FaCheckCircle.svelte";
  const url = `${import.meta.env.VITE_DEV_URL}files/`;
  const dispatch = createEventDispatcher();

  export let file: string;
  let fileInput: HTMLInputElement;
  let error: string;

  // To prevent opening file in browser
  const dragOverHandler = (e: Event) => {
    e.preventDefault();
  };

  const onFileSelected = async (
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    const image = e.currentTarget.files[0];
    dispatch("postImage", { data: image });
  };

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, _i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file.type.includes("image")) {
            dispatch("postImage", { data: file });
          } else {
            error = "Please provide an image";
          }
        }
      });
    } else {
      [...e.dataTransfer.items].forEach((file, _i) => {
        console.log(file);
      });
    }
  };

  const handleCopyLink = (e: any) => {
    const initialText = e.target.innerText;
    e.target.innerText = "Copied!";
    e.disabled = true;
    navigator.clipboard.writeText(`${url}${file}`);
    setTimeout(() => {
      e.disabled = false;
      e.target.innerText = initialText;
    }, 2000);
  };
</script>

<div
  class="flex flex-col gap-6 items-center p-10 rounded-md text-center shadow-[1px_1px_10px_0_rgba(0,0,0,0.15)]"
>
  {#if file}
    <div class="flex flex-col items-center">
      <div class="w-8 h-8 text-green-600">
        <FaCheckCircle />
      </div>
      <h2 class="text-xl">Uploaded successfully</h2>
    </div>
  {:else}
    <h2 class="text-xl">Upload your image</h2>
  {/if}
  <p class="text-sm">File should be Jpeg, Png...</p>
  <div
    on:dragover={dragOverHandler}
    on:drop={dropHandler}
    class="with-border w-96 h-64 relative flex flex-col gap-12 justify-center items-center bg-slate-100 rounded-md"
  >
    {#if file}
      <img class="rounded-2xl" src={`${url}${file}`} alt="file" />
    {:else}
      <input
        class="hidden"
        type="file"
        name="file"
        accept="image/*"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileInput}
      />
      <img
        width="125"
        height="125"
        src={image}
        alt="logo"
        class="inline-block"
      />
      <p class="text-sm text-gray-400">Drag & drop your image here</p>
      {#if error}
        <span class="absolute bottom-3 text-red-500">{error}</span>
      {/if}
    {/if}
  </div>
  {#if file}
    <div
      class="flex items-center w-96 m-5 pl-2 rounded-lg border border-gray-200"
    >
      <span
        title={`${url}${file}
`}
        class="truncate text-xs"
        data-tooltip={`${url}${file}
`}
      >
        {url}{file}
      </span>
      <button
        type="button"
        on:click={handleCopyLink}
        class=" w-fit h-fit px-4 py-2 whitespace-nowrap bg-blue-500 text-white rounded-xl hover:shadow-md hover:bg-blue-600"
        >Copy link</button
      >
    </div>
  {:else}
    <p class="text-sm text-gray-400">Or</p>
    <button
      type="button"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:shadow-md hover:bg-blue-600"
      on:click={() => fileInput.click()}
      >Choose your file
    </button>
  {/if}
</div>

<style>
  .with-border {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='21' ry='21' stroke='%239FC2F5FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='6' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 21px;
  }
</style>
