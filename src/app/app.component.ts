import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TreeFolderService } from './services/tree-folder.service';
import { NodeModel } from './models/node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  treeFolderDirectoryData: NodeModel[];
  onDestroySubject = new Subject();
  showForm = false;
  lastId = 0;
  existingDataNode;

  folderDirectory = this.fb.group({
    filename: [''],
    filetype: ['']
  })

  constructor(private treeFolderService: TreeFolderService, private fb: FormBuilder) {
    this.treeFolderService.gettreeFolderDirectoryObject().subscribe((obj) => {
      this.treeFolderDirectoryData = obj;
    });

    this.treeFolderService.getoutputEventTree().subscribe((obj) => {
      if (obj) {
        this.triggerOutputEventFunction(obj);
      }
    });
  }

  addDirectory() {
    if (!this.folderDirectory.value.filename.trim()) {
      return;
    }
    let updated;
    const req = {
      name: this.folderDirectory.value.filename,
      type: this.folderDirectory.value.filetype,
      id: this.lastId++,
      children: []
    }
    if (this.existingDataNode) {
      this.existingDataNode['children'].push(req);
      updated = this.treeFolderService.addFolderOrFileInDirectoryStructure(this.existingDataNode, 'child');
    } else {
      updated = this.treeFolderService.addFolderOrFileInDirectoryStructure(req, 'root');
    }

    this.treeFolderService.updatetreeFolderDirectoryObject(updated);
    this.hideAndResetForm();
    this.existingDataNode = null;

  }
  hideAndResetForm() {
    this.showForm = false;
    this.folderDirectory.reset();
  }

  showFormToAddFolderOrFiles() {
    this.existingDataNode = null;
    this.showForm = true;
    this.folderDirectory.controls['filetype'].setValue('folder');
  }

  triggerOutputEventFunction(event) {
    if (event.action === 'add') {
      this.showForm = true;
      this.existingDataNode = event.data;
      this.folderDirectory.controls['filetype'].setValue('folder');
    } else if (event.action === 'delete') {
      this.treeFolderService.deleteTreeNode(event.data);
    }

  }


}
