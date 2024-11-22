/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { blocks } from './blocks/blocks';
// import { forBlock } from './generators/javascript';
import { forBlock } from './generators/python';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
// import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import { registerFieldAngle } from '@blockly/field-angle';
registerFieldAngle();

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
// Object.assign(javascriptGenerator.forBlock, forBlock);
Object.assign(pythonGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode')?.firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const modal = document.getElementById('pythonModal');
const generateCodeBtn = document.getElementById('generateCodeBtn');
const closeModal = document.getElementById('closeModal');
const saveCodeBtn = document.getElementById('saveCodeBtn');
const codeDisplay = document.getElementById('codeDisplay');
const canvasId = 'turtleCanvas';

if (!blocklyDiv) {
  throw new Error("div with id 'blocklyDiv' not found");
}
const ws = Blockly.inject(blocklyDiv, { toolbox });

function updatedCode() {
  const code = pythonGenerator.workspaceToCode(ws);

  return `from turtle import Turtle\nimport time\nt = Turtle()\nt.color('black')\nt.down()\n${code}\ntime.sleep(2)`;
}

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
function runCode() {
  const code = pythonGenerator.workspaceToCode(ws);

  if (codeDiv) codeDiv.textContent = code;
  if (outputDiv) outputDiv.innerHTML = '';

  // Get canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('Canvas element not found');
    if (outputDiv) {
      outputDiv.innerHTML += '<div class="text-red-500">Error: Canvas element not found</div>';
    }
    return;
  }

  // Configuración para Skulpt después de importar módulos específicos
  Sk.onAfterImport = function (library) {
    if (library === 'turtle') {
      Sk.tg.defaults.animate = false;
      Sk.tg.Turtle.prototype.speed = function () {};
      Sk.tg.Turtle.prototype.delay = function () {};
    }
  };

  // Configuración para Skulpt
  Sk.configure({
    output: function (text) {
      if (outputDiv) outputDiv.innerHTML += text;
    },
    read: function (x) {
      if (!Sk.builtinFiles || !Sk.builtinFiles['files'][x]) {
        throw "File not found: '" + x + "'";
      }
      return Sk.builtinFiles['files'][x];
    },
    __future__: Sk.python3,
    retainglobals: true,
  });

  Sk.canvas = canvasId;

  // Configure turtle graphics
  Sk.TurtleGraphics = Sk.TurtleGraphics || {};
  Sk.TurtleGraphics.target = canvasId;

  const fullCode = updatedCode();
  console.log(fullCode);

  Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody('<stdin>', false, fullCode, true);
  }).then(function (mod) {
    console.log('Code executed successfully');
  }).catch(function (err) {
    console.error(err.toString());
    if (outputDiv) {
      outputDiv.innerHTML += `<div class="text-red-500">${err.toString()}</div>`;
    }
  });
}

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener(function (e) {
    if (e.isUiEvent) return; // Ignore UI events like scrolling
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener(function (e) {
    if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING || ws.isDragging()) {
      return;
    }
  });
}

function updateCodeDisplay(code) {
  if (codeDisplay) codeDisplay.textContent = code;
}

// Close modal
if (closeModal) {
  closeModal.addEventListener('click', function () {
    if (modal) modal.classList.remove('show');
  });
}

// Close modal when clicking outside
if (modal) {
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}

// Save code functionality
if (saveCodeBtn) {
  saveCodeBtn.addEventListener('click', function () {
    const code = codeDisplay?.textContent;

    if (code) {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'turtle_code.py';
      a.click();
      URL.revokeObjectURL(url);
      if (modal) modal.classList.remove('show');
    }
  });
}

if (generateCodeBtn) {
  generateCodeBtn.addEventListener('click', function () {
    const code = updatedCode();
    updateCodeDisplay(code);
    if (modal) modal.classList.add('show');
  });
}

const runButton = document.querySelector('#runButton');

if (runButton) {
  runButton.addEventListener('click', function () {
    runCode();
  });
}