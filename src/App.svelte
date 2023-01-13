<script>
  import Header from './components/Header.svelte';
  import Intro from './components/Intro.svelte';
  import Field from './components/Field.svelte';
  import Award from './components/Award.svelte';
</script>

<main class="w-full">
  <Header />
  <div class="content">
    <Intro />
    <Field />
    <Award />
  </div>
</main>

<style>
  main > .content {
    margin-top: 100vh;
  }
</style>
