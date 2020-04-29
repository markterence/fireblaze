<template>
  <div class="d-flex flex-column-reverse ">
    <b-input
      :id="id"
      v-bind="$attrs"
      :value="value"
      :class="[$style.floating, 'py-4']"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
    ></b-input>
    <label :class="[$style.floatingLabel, 'text-muted']" :for="id">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null
    }
  }
}
</script>
<style module>
.floatingLabel {
  font-style: italic;
}

.floating,
.floatingLabel {
  transition: all 0.2s;
  touch-action: manipulation;
}
.floating::-webkit-input-placeholder {
  opacity: 0;
  transition: inherit;
}
.floating::input-placeholder {
  opacity: 0;
  transition: inherit;
}
.floating:not(:placeholder-shown) + .floatingLabel,
.floating:focus + .floatingLabel {
  transform: translate(0.12rem, -0.2rem) scale(0.79);
  top: 0;
  position: absolute;
}
.floating:not(:placeholder-shown) + .floatingLabel {
  color: #364fc7 !important;
  font-weight: 800;
  font-style: normal;
}
.floating:placeholder-shown + .floatingLabel {
  cursor: text;
  max-width: 66.66%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0.8rem, 0.899rem) scale(1.2);
  top: 0;
  position: absolute;
}
</style>
