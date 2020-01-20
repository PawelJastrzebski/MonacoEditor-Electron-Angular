import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AppConfig} from "../../environments/environment";
import {ElectronService} from "../core/services";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss']
})
export class MonacoEditorComponent implements  AfterViewInit {

  private nodeRequire;
  private nodeProcess;
  private nodeNodule;

  @Input()
  code: string;

  @ViewChild("editor", {static: true})
  editorContent: ElementRef;

  ngAfterViewInit() {

    const onGotAmdLoader = () => {
      window.require(["vs/editor/editor.main"], () => {
        this.initMonaco();
      });
    };

    debugger;
    if (window && window.process && window.process.type) {

      this.nodeRequire = window.require;
      this.nodeProcess = window.process;
      this.nodeNodule = (window as any).module;
      (window as any).module = undefined;
      window.process = undefined;
      window.require = undefined;

      const loaderScript = document.createElement("script");
      loaderScript.type = "text/javascript";
      loaderScript.src = "vs/loader.js";
      loaderScript.addEventListener("load", () => {

        window.require.config({paths: {'vs': 'vs'}});
        window.require(['vs/editor/editor.main'], () => {
          (window as any).module = this.nodeNodule;
          window.process = this.nodeProcess;
          window.require = this.nodeRequire;
          this.initMonaco();
        });
      });
      document.body.appendChild(loaderScript);

    } else {
      // Load AMD loader if necessary
      if (!(window).require) {
        const loaderScript = document.createElement("script");
        loaderScript.type = "text/javascript";
        loaderScript.src = "vs/loader.js";
        loaderScript.addEventListener("load", onGotAmdLoader);
        document.body.appendChild(loaderScript);
      } else {
        onGotAmdLoader();
      }

    }

  }

  private initMonaco() {
    const editor = (window as any).monaco.editor.create(this.editorContent.nativeElement, {
      value: this.code,
      language: "javascript",
      theme: "vs-dark"
    });
  }

}
