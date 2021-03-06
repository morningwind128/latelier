<template>
  <div id="canvas" ref="canvas" />
</template>

<script>
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import Modeler from "bpmn-js/dist/bpmn-modeler.production.min";
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import "/imports/ui/bpmn/minimap-custom.css";
import minimapModule from "diagram-js-minimap";

import debounce from "lodash/debounce";

export default {
  props: {
    example: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      modeler: null,
      saveDebounce: null,
      xmlCache: null
    };
  },
  watch: {
    example: {
      immediate: true,
      handler() {
        this.refresh();
      }
    }
  },
  mounted() {
    this.saveDebounce = debounce(this.save, 2000);
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        if (!this.modeler) {
          this.modeler = new Modeler({
            container: this.$refs.canvas,
            keyboard: { bindTo: document },
            additionalModules: [minimapModule],
            height: 430
          });
          this.modeler.get("minimap").open();
          this.modeler.on("element.changed", () => {
            this.saveDebounce();
          });
        }
        if (
          this.example.xml
          && this.example.xml !== this.xmlCache
        ) {
          this.modeler.importXML(this.example.xml);
          this.xmlCache = this.example.xml;
        } else if (!this.xmlCache) {
          this.modeler.createDiagram();
        }
      });
    },

    save() {
      this.modeler.saveXML({ format: false }, (err, xml) => {
        if (err) {
          this.$store.dispatch("notifyError", error);
          return;
        }
        this.xmlCache = xml;
        Meteor.call(
          "bpmnExamples.saveXML",
          { exampleId: this.example._id, xml },
          (error) => {
            if (error) {
              this.$store.dispatch("notifyError", error);
            }
          }
        );
      });
    },

    saveSVG(cb) {
      this.modeler.saveSVG(cb);
    },

    undo() {
      this.modeler.get("commandStack").undo();
    },

    redo() {
      this.modeler.get("commandStack").redo();
    }
  }
};
</script>

<style scoped></style>
