import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NodeModel } from '../models/node.model';


@Injectable({
  providedIn: 'root'
})
export class TreeFolderService {
  treeFolderDirectoryData: NodeModel[] = []
  treeFolderDirectory: BehaviorSubject<NodeModel[]> = new BehaviorSubject<NodeModel[]>(this.treeFolderDirectoryData);
  outputEventTree: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  updatetreeFolderDirectoryObject(res) {
    this.treeFolderDirectory.next(res);
  }

  getoutputEventTree() {
    return this.outputEventTree.asObservable();
  }

  updateoutputEventTree(res) {
    this.outputEventTree.next(res);
  }

  gettreeFolderDirectoryObject() {
    return this.treeFolderDirectory.asObservable();
  }
  addFolderOrFileInDirectoryStructure(data, actionType) {
    if (actionType === 'root') {
      this.treeFolderDirectoryData.push(data);
    }

    return this.treeFolderDirectoryData;
  }

  deleteTreeNode(data) {
    this.getItemFromData(this.treeFolderDirectoryData, data)
  }

  getItemFromData(data, selectedData) {
    data.filter((item, index) => {
      if (item.children && item.children.length > 0) {
        if (item.id === selectedData.id) {
          data.splice(index, 1);
          return;
        } else {
          this.getItemFromData(item.children, selectedData);
        }
      } else {
        if (item.id === selectedData.id) {
          data.splice(index, 1);
          return;
        }
      }
    })
    return data;
  }

}
