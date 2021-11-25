import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeFolderService } from 'src/app/services/tree-folder.service';
import { NodeModel } from '../../models/node.model';

@Component({
  selector: 'app-tree-folder',
  templateUrl: './tree-folder.component.html',
  styleUrls: ['./tree-folder.component.scss']
})
export class TreeFolderComponent implements OnInit {
  @Input('treeFolderDirectory') treeViewData: NodeModel[] = []; //data receive from other components
  constructor(private treeFolderService: TreeFolderService,) { }
  ngOnInit(): void {
  }

  actions(node, action) {
    const actionObj = { data: node, action: action }
    this.treeFolderService.updateoutputEventTree(actionObj);
  }
}
