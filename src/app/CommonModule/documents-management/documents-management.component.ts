import { DocumentService } from "./../../Services/document.service";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  Renderer2,
  ElementRef,
} from "@angular/core";
import * as $ from "jquery";
import { ActivatedRoute, Router } from "@angular/router";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NotifyManagement } from "../../shared/NotifyManagement";
import * as FileSaver from "file-saver";
import { Subscription } from "rxjs";
import { PDFDocumentProxy } from "ng2-pdf-viewer";
import {  DocumentTypeEnum } from "../../Models/CustomersModels/Enums/MarketEnum";

@Component({
  selector: "ngx-documents-management",
  templateUrl: "./documents-management.component.html",
  styleUrls: ["./documents-management.component.scss"],
})
export class DocumentsManagementComponent implements OnInit, OnDestroy {
  id: number;
  type: number;
  requestName = "";
  isViewMode: boolean = false;
  market: DocumentTypeEnum;
  isBroker: number;
  isSupervisor=false;

  constructor(
    private documentService: DocumentService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notify: NotifyManagement,
    private router: Router
  ) {
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
    this.type = routeParams.type;
    this.requestName = routeParams.name;
    this.isViewMode = routeParams.isViewMode.toLowerCase() == "true";
    this.market = routeParams.market;
    this.isBroker = routeParams.isBroker==0 || routeParams.isBroker==-1 ?0:1;

    this.isSupervisor=routeParams.isBroker==-1?true:false;
    console.log(this.isSupervisor)

  }

  AllevidenceCategories: Array<any>;
  evidenceCategories: Array<any> = new Array<any>();

  root: any;
  nodes: any;
  IsBlur = false;
  pageIsloaded = false;
  requestForm: FormGroup;

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      file: [null, Validators.required],
    });

    this.getDocumentsOfCustomer();
  }

  // pdfFile = new FileReader();
  // fileChange(event) {
  //   this.pdfFile.readAsArrayBuffer(event.target.files[0]);
  //   console.log(this.pdfFile)
  // }
  pdfFile: File = null;
  pdfSrcs: any = null;
  onFileChange(fileInput?: any) {
    try {
      this.pdfPreviewIsLoaded = false;
      this.pdfFile = <File>fileInput.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.pdfFile);
      reader.onload = (_event) => {
        this.pdfSrcs = reader.result;
      };
    } catch (error) {
      this.pdfPreviewIsLoaded = true;
      this.pdfFile = null;
      this.pdfSrcs = null;
      this.myInputVariable.nativeElement.value = "";
    }
  }
  allNodesINDatabase: any;
  public getDocumentsOfCustomer() {
    this.getStatusOfEvidenceSubscriber = this.documentService
      .getStatusOfEvidence(this.id, this.type,this.market,this.isBroker)
      .subscribe(
        (result) => {
          this.allNodesINDatabase = result;
          this.getNodes();
        },
        (error) => {
          console.log(error);
          this.sendDataToServer = false;

          if (error && error.status == 401) {
            this.notify.showErrorMessageBox(
              "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
            );
            return;
          }

          if (error && error.status == 500) {
            this.notify.showErrorMessageBox("خطای سروری 500");
            return;
          }

          if (
            error == undefined ||
            error.error == undefined ||
            error.error.errors == undefined
          )
            return;

          for (let errItemValue of Object.entries(error.error.errors)) {
            let val = errItemValue[1];
            if (errItemValue[1] != undefined && errItemValue[1] != null) {
              for (let errorMessageItem of Object.entries(val)) {
                this.notify.showErrorMessageBox(errorMessageItem[1]);
              }
            }
          }
        }
      );
  }

  sendDataToServer = false;

  documentData: any;
  uploadFile() {
    this.sendDataToServer = true;
    if(this.market==DocumentTypeEnum.Attorney)
      this.getTokenForUploadEvidenceForAttorneyRequestCode() 
    else
      this.getTokenForUploadEvidenceForCustomersRequestCode();
  }

  public getTokenForUploadEvidenceForCustomersRequestCode() {
    this.getTokenForUploadEvidenceOfRequestSubscriber = this.documentService
      .getTokenForUploadEvidenceOfRequest(
        this.id,
        this.type,
        this.selectedNode.evidence.id,
        this.selectedNode.evidence.name,
        DocumentTypeEnum.UnKnown,this.isBroker
      )
      .subscribe(
        (result) => {
          //TODO: check token does not NULL
          this.postFileOfEvidence(result.token, this.pdfFile);
        },
        (error) => {
          console.log(error);
          this.sendDataToServer = false;

          if (error && error.status == 401) {
            this.notify.showErrorMessageBox(
              "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
            );
            return;
          }

          if (error && error.status == 500) {
            this.notify.showErrorMessageBox("خطای سروری 500");
            return;
          }

          if (
            error == undefined ||
            error.error == undefined ||
            error.error.errors == undefined
          )
            return;

          for (let errItemValue of Object.entries(error.error.errors)) {
            let val = errItemValue[1];
            if (errItemValue[1] != undefined && errItemValue[1] != null) {
              for (let errorMessageItem of Object.entries(val)) {
                this.notify.showErrorMessageBoxWithDuplicate(
                  errorMessageItem[1]
                );
              }
            }
          }
        }
      );
  }


  public getTokenForUploadEvidenceForAttorneyRequestCode() {
    this.getTokenForUploadEvidenceOfRequestSubscriber = this.documentService
      .getTokenForUploadEvidenceOfRequest(
        this.id,
        this.type,
        this.selectedNode.evidence.id,
        this.selectedNode.evidence.name,
        DocumentTypeEnum.Attorney,this.isBroker
      )
      .subscribe(
        (result) => {
          //TODO: check token does not NULL
          this.postFileOfEvidence(result.token, this.pdfFile);
        },
        (error) => {
          console.log(error);
          this.sendDataToServer = false;

          if (error && error.status == 401) {
            this.notify.showErrorMessageBox(
              "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
            );
            return;
          }

          if (error && error.status == 500) {
            this.notify.showErrorMessageBox("خطای سروری 500");
            return;
          }

          if (
            error == undefined ||
            error.error == undefined ||
            error.error.errors == undefined
          )
            return;

          for (let errItemValue of Object.entries(error.error.errors)) {
            let val = errItemValue[1];
            if (errItemValue[1] != undefined && errItemValue[1] != null) {
              for (let errorMessageItem of Object.entries(val)) {
                this.notify.showErrorMessageBoxWithDuplicate(
                  errorMessageItem[1]
                );
              }
            }
          }
        }
      );
  }


  public postFileOfEvidence(token, fileBinary) {
    this.postFileOfEvidenceSubscriber = this.documentService
      .postFileOfEvidence(token, fileBinary)
      .subscribe(
        (finalToken) => {
          this.finalizeEvidenceToToken(finalToken);
        },
        (error) => {
          console.log(error);
          this.sendDataToServer = false;

          if (error && error.status == 401) {
            this.notify.showErrorMessageBox(
              "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
            );
            return;
          }

          if (error && error.status == 500) {
            this.notify.showErrorMessageBox("خطای سروری 500");
            return;
          }

          if (
            error == undefined ||
            error.error == undefined ||
            error.error.errors == undefined
          )
            return;

          for (let errItemValue of Object.entries(error.error.errors)) {
            let val = errItemValue[1];
            if (errItemValue[1] != undefined && errItemValue[1] != null) {
              for (let errorMessageItem of Object.entries(val)) {
                this.notify.showErrorMessageBoxWithDuplicate(
                  errorMessageItem[1]
                );
              }
            }
          }
        }
      );
  }

  public finalizeEvidenceToToken(finalToken) {
    this.finalizeEvidenceSubscriber = this.documentService
      .finalizeEvidence(finalToken, this.type,this.market)
      .subscribe(
        (resultOfNode) => {
          console.info(resultOfNode);
          this.notify.showSuccessMessageBoxWithDuplicate(
            "درخواست بارگذاری با موفقیت انجام شد"
          );
          // this.allNodesINDatabase
          this.updateNodeStatus(this.selectedNode.evidence.id, resultOfNode);
          this.sendDataToServer = false;
          this.closeModal();
        },
        (error) => {
          console.log(error);
          this.sendDataToServer = false;
          if (
            error == undefined ||
            error.error == undefined ||
            error.error.errors == undefined
          )
            return;

          for (let errItemValue of Object.entries(error.error.errors)) {
            let val = errItemValue[1];
            if (errItemValue[1] != undefined && errItemValue[1] != null) {
              for (let errorMessageItem of Object.entries(val)) {
                this.notify.showErrorMessageBoxWithDuplicate(
                  errorMessageItem[1]
                );
              }
            }
          }
        }
      );
  }

  updateNodeStatus(nodeId, uploadedDocument) {
   
    console.log('nodeId:');
    console.log(nodeId)

    console.log('uploadedDocument:');
    console.log(uploadedDocument)


    let item = this.allNodesINDatabase.filter((x) => x.evidence.id == nodeId);
    console.log('findItem For Update:');
    console.log(item);

    if (item != undefined && item[0] != undefined) {
      item[0].exists = true;
      item[0].uri = uploadedDocument == undefined ? "" : uploadedDocument.id;
      item[0].size = uploadedDocument == undefined ? "" : uploadedDocument.size;
    }
    let item2 = this.allNodesINDatabase.filter((x) => x.evidence.id == nodeId);
    console.log('findItem For after Update:');
    console.log(item2);
  }

  getCategories(type: CustomerTypeEnum) {
    this.getEvidenceCategoriesSubscriber = this.documentService
      .getEvidenceCategories()
      .subscribe((result) => {
        

        // TODO: Check Null && number change to ENUM!
        this.root = result.find((x) => x.categoryId == 0).name;
        // TODO: change Request Type Individual Or Legal type into ENUM!
        //All
        //  this.AllevidenceCategories=result.filter(x=>x.categoryId!=0 && (x.evidenceType.id==100) );
        //All && legal
        if (type == CustomerTypeEnum.legalInterior)
          this.AllevidenceCategories = result.filter(
            (x) =>
              x.categoryId != 0 &&
              (x.evidenceType.id === 100 ||
                x.evidenceType.id === 6 ||
                x.evidenceType.id === 7)
          );

        //All && public
        if (type == CustomerTypeEnum.public)
        this.AllevidenceCategories = result.filter(
          (x) =>
            x.categoryId != 0 &&
            (x.evidenceType.id === 100 ||
              x.evidenceType.id === 9 ||
              x.evidenceType.id === 10)
        );

        //All && Individual
        if (type == CustomerTypeEnum.individualInterior)
          this.AllevidenceCategories = result.filter(
            (x) =>
              x.categoryId != 0 &&
              (x.evidenceType.id === 100 ||
                x.evidenceType.id === 5 ||
                x.evidenceType.id === 7)
          );

                  //Only attorneyRequests
        if (this.market==DocumentTypeEnum.Attorney){
          this.AllevidenceCategories = result.filter(
            (x) =>
              x.categoryId == 100  
              
          );
          // (x.id === 4 || x.id === 1)
     
          
        }


        this.AllevidenceCategories.forEach((element) => {
          if (this.checkHasChildern(element.id, this.type)) {
            // console.log(this.allNodesINDatabase.filter(x=>x.evidence.id==element.id).exists)
            // element.exists= this.allNodesINDatabase.filter(x=>x.evidence.id==element.id).exists;
            this.evidenceCategories.push(element);
          } else {
            console.error("checkHasChildern not found");
          }
        });
        //   for (let index = 0; index < evidenceCategoriesCollection.length; index++) {
        //     let element = evidenceCategoriesCollection[index];
        //      this.nodes=result.filter(x=>x.evidence.categoryId==element.id)

        //  }
        this.pageIsloaded = true;
      });
  }
  checkHasChildern(cateId, type: CustomerTypeEnum) {
    let result: any;

    if(this.market==DocumentTypeEnum.Attorney)
        {
// x.evidence.categoryId == cateId && delete to show
          result = this.allNodes.filter(
            (x) =>
            x.evidence.categoryId == cateId &&
              (x.evidenceType.id == DocumentTypeEnum.Attorney)
          );
          
        }

    if (type == CustomerTypeEnum.individualInterior)
      result = this.allNodes.filter(
        (x) =>
          x.evidence.categoryId == cateId &&
          (x.evidenceType.id == 5 ||
            x.evidenceType.id == 100 ||
            x.evidenceType.id == 1 ||
            x.evidenceType.id == 7)
      );

    if (type == CustomerTypeEnum.legalInterior)
      result = this.allNodes.filter(
        (x) =>
          x.evidence.categoryId == cateId &&
          (x.evidenceType.id == 6 ||
            x.evidenceType.id == 2 ||
            x.evidenceType.id == 100 ||
            x.evidenceType.id == 7)
      );

      if (type == CustomerTypeEnum.public){
 
        result = this.allNodes.filter(
          (x) =>
            x.evidence.categoryId == cateId &&
            ( 
              x.evidenceType.id == 9 ||
              
              x.evidenceType.id == 10)
        );
  
      }

    if (result == undefined || result.length == 0) return false;

    // FOR BUG UI !!!
    if (result.length == 1) {
      let emptyNode: any = new Object();
      emptyNode.evidenceType = new Object();
      emptyNode.evidence = new Object();
      emptyNode.evidenceStatus = new Object();
      emptyNode.evidenceType.id = result[0].evidenceType.id;
      emptyNode.evidence.categoryId = result[0].evidence.categoryId;
      emptyNode.evidence.name = "...";
      emptyNode.evidenceStatus.id = 3;
      this.allNodes.push(emptyNode);
    }
    return true;
  }

  allNodes: any = [];
  getNodes() {
    this.getEvidenceNodesSubscriber = this.documentService
      .getEvidenceNodes()
      .subscribe(
        (result) => {
          this.allNodes = [...result];
       console.log('this.allNodes')
       console.log(this.allNodes)
          

          this.getMarketNodesSubscriber = this.documentService
            .getMarketNodes()
            .subscribe((result) => {
              if (this.market == DocumentTypeEnum.SpotMarketAndDerivativesMarket)
                  {
                    this.allNodes.push(...result);
                
                  }
              else if (this.market == DocumentTypeEnum.SpotMarket)
                this.allNodes.push(
                  ...result.filter((x) => x.marketId == DocumentTypeEnum.SpotMarket)
                );
              else if (this.market == DocumentTypeEnum.DerivativesMarket)
                this.allNodes.push(
                  ...result.filter(
                    (x) => x.marketId == DocumentTypeEnum.DerivativesMarket
                  )
                );
                else if (this.market == DocumentTypeEnum.Attorney)
                this.allNodes.push(
                  ...result.filter(
                    (x) => x.marketId == DocumentTypeEnum.Attorney
                  )
                );
              this.getCategories(this.type);
            });
        },
        (error) => {
          console.log(error);
          this.pageIsloaded = true;
          if (
            error == undefined ||
            error.error == undefined ||
            error.error.errors == undefined
          )
            return;

          for (let errItemValue of Object.entries(error.error.errors)) {
            let val = errItemValue[1];
            if (errItemValue[1] != undefined && errItemValue[1] != null) {
              for (let errorMessageItem of Object.entries(val)) {
                this.notify.showErrorMessageBoxWithDuplicate(
                  errorMessageItem[1]
                );
              }
            }
          }
        }
      );
  }
  selectedNode: any;
  selectedNodeSize = 0;
  hasUploadFile = false;
  selectedUploadedDocument = undefined;
  openModal(id) {
    let result = this.allNodes.filter((x) => x.evidence.id === id);
    console.log(result);

    let item = this.allNodesINDatabase.filter((x) => x.evidence.id == id);

    if (item == undefined || item[0] == undefined) {
      this.hasUploadFile = false;
      this.selectedNodeSize = 0;
      this.selectedUploadedDocument = undefined;
    } else {
      this.selectedUploadedDocument = item[0];

      this.selectedNodeSize = item[0].size;
      this.hasUploadFile = item[0].exists;
    }

    if (!result) {
      return;
    }
    this.selectedNode = result[0];

    if (this.selectedNode.evidence.name === "...") return;

    this.IsBlur = true;
    $(".modal").removeClass("out");
    $(".modal").addClass("in");
    $(".modal").css("display", "block");
    setTimeout(function () {
      $(".modal").css("z-index", "10000000000");
      $(".modal").css("height", "370px");
      $(".modal").css("width", "550px");
      $(".modal").css("padding", "20px");
    }, 700);
    setTimeout(function () {
      $(".modal-container").fadeIn("slow");
    }, 900);
    $(".circle").addClass("circle-active");
    setTimeout(function () {
      $(".circle").removeClass("circle-active");
      $(".circle").addClass("circle-hide");
    }, 800);
  }

  downloadFileStatus = false;
  downloadDocumentOfSelectedNode() {
    this.downloadFileStatus = true;
    if (
      this.selectedUploadedDocument == undefined ||
      this.selectedUploadedDocument.uri == undefined ||
      this.selectedUploadedDocument.uri == ""
    )
      return;

      //TODO: Change isBrokerSide To Enum
      let isBrokerSide=this.isBroker==0?0:1;

    this.downloadUploadedDocumentSubscriber = this.documentService
      .downloadUploadedDocument(this.selectedUploadedDocument.uri,isBrokerSide)
      .subscribe(
        (resultOfNode) => {
          FileSaver.saveAs(resultOfNode, "downloadDocument.pdf");
          this.downloadFileStatus = false;
        },
        (error) => {
          console.log(error);
          this.downloadFileStatus = false;
          if (
            error == undefined ||
            error.error == undefined ||
            error.error.errors == undefined
          )
            return;

          for (let errItemValue of Object.entries(error.error.errors)) {
            let val = errItemValue[1];
            if (errItemValue[1] != undefined && errItemValue[1] != null) {
              for (let errorMessageItem of Object.entries(val)) {
                this.notify.showErrorMessageBoxWithDuplicate(
                  errorMessageItem[1]
                );
              }
            }
          }
        }
      );
  }

  @ViewChild("myInput", { static: false })
  myInputVariable: ElementRef;
  closeModal() {
    this.sendDataToServer = false;
    this.pdfFile = null;
    this.pdfSrcs = null;
    this.myInputVariable.nativeElement.value = "";

    this.pdfPreviewIsLoaded = true;
    setTimeout(() => {
      this.IsBlur = false;
    }, 650);
    $(".modal-container").fadeOut("fast");
    $(".circle").removeClass("circle-hide");
    setTimeout(function () {
      $(".modal").removeClass("in");
      $(".modal").addClass("out");
    }, 150);
    setTimeout(function () {
      $(".modal").css("z-index", "0");
      $(".modal").css("height", "0");
      $(".modal").css("width", "0");
      $(".modal").css("padding", "0");
    }, 150);
  }

  pdfPreviewIsLoaded = true;
  callBackFn(pdf: PDFDocumentProxy) {
    this.pdfPreviewIsLoaded = true;
  }

  downloadUploadedDocumentSubscriber: Subscription;
  getEvidenceNodesSubscriber: Subscription;
  getMarketNodesSubscriber: Subscription;
  getEvidenceCategoriesSubscriber: Subscription;
  finalizeEvidenceSubscriber: Subscription;
  postFileOfEvidenceSubscriber: Subscription;
  getTokenForUploadEvidenceOfRequestSubscriber: Subscription;
  getStatusOfEvidenceSubscriber: Subscription;

  ngOnDestroy(): void {
    if (this.downloadUploadedDocumentSubscriber !== undefined) {
      this.downloadUploadedDocumentSubscriber.unsubscribe();
    }

    if (this.getEvidenceNodesSubscriber !== undefined) {
      this.getEvidenceNodesSubscriber.unsubscribe();
    }

    if (this.getEvidenceCategoriesSubscriber !== undefined) {
      this.getEvidenceCategoriesSubscriber.unsubscribe();
    }

    if (this.finalizeEvidenceSubscriber !== undefined) {
      this.finalizeEvidenceSubscriber.unsubscribe();
    }

    if (this.postFileOfEvidenceSubscriber !== undefined) {
      this.postFileOfEvidenceSubscriber.unsubscribe();
    }

    if (this.getTokenForUploadEvidenceOfRequestSubscriber !== undefined) {
      this.getTokenForUploadEvidenceOfRequestSubscriber.unsubscribe();
    }

    if (this.getStatusOfEvidenceSubscriber !== undefined) {
      this.getStatusOfEvidenceSubscriber.unsubscribe();
    }

    if (this.getMarketNodesSubscriber !== undefined) {
      this.getMarketNodesSubscriber.unsubscribe();
    }
  }

  backToRequests() {

    console.log('this.isSupervisor')
    console.log(this.isSupervisor);
    
    if (this.market==DocumentTypeEnum.Attorney) {
      this.router.navigate(["broker/attorneyRequests"]);
      return;
    }
    if (this.isSupervisor) {
      this.router.navigate(["exchange/supervisorManagementRequests"]);
      return;
    }

    if (this.isBroker==1) this.router.navigate(["broker/request"]);
    if (this.isBroker==0) this.router.navigate(["exchange/requestOfBrokers"]);

  }
}
