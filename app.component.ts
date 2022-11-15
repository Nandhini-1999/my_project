import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, Form, RequiredValidator } from "@angular/forms";
// import { pipe, switchMap } from 'rxjs';
// import { ValidatePassword } from "./must-match/validate-password";
import { Document, parseDocument } from 'yaml';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Test';
  gitUrl = 'https://api.github.com/repos';
  payload = {};
  constructor(
    private api: ApiService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef) {
  }

  submitted = false;


  myform = this.fb.group({
    repository: ['',[Validators.required]],
    type: ['git',[Validators.required]],
    name: [ '' , [Validators.required]],
    endpoint: [ '' , [Validators.required]],
    ref: ['refs/heads/main',[Validators.required]],
    nodeVersionSpec: ['10.x',[Validators.required]],
    template: ['pipeline-template.yml@templates',[Validators.required]],
    agent: ['windows-latest',[Validators.required]],
    buildType: ['', [Validators.required]],
    projectName: [ '' , [Validators.required]],
    codeRootDir: [ '' , [Validators.required]],
    enableCi: ['true', [Validators.required]],
    docker: ['', [Validators.required]],
    sonar: ['', [Validators.required]],
    sonarProjectKey: [ '' , [Validators.required]],
    sonarProjectName: [ '' , [Validators.required]],
    sonarbuildFor: [ '' , [Validators.required]],
    azureSubscription: ['Free Trial',[Validators.required]],
    scan: [ '' , [Validators.required]],
    gate: [ '' , [Validators.required]],
    enableCd: ['true', [Validators.required]],
    azureSubscrip: ['Free Trial',[Validators.required]],
    azureAppServiceName: [ '' , [Validators.required]],
    environmentName: ['AzurePAAS',[Validators.required]],
    gitUrl: ['https://api.github.com/repos/vijayanandhini-v_infosys/Angular/contents/sample.yaml', [Validators.required]],
    branch: ['master', [Validators.required]] 
  })


  ngOnInit() {
    // this.saveFile();
  }


  
  get formData(){
    return this.myform.controls
  }
  onSubmit(formdata:any) {
    console.log(formdata);
      
      
    const doc= new Document([{
      resources:{
        repositories:{
          repository: formdata.repository,
          type: formdata.type,
          name: formdata.name,
          endpoint: formdata.endpoint,
          ref: formdata.ref
        }
      },
      variables:{
        nodeVersionSpec: formdata.nodeVersionSpec,
      },
      stages:{
        template: formdata.template,
        parameters:{
          windowsAgentPool: formdata.agent,
          buildType: formdata.buildType,
          projectName: formdata.projectName,
          codeRootDir: formdata.codeRootDir,
          CI:{
            Enabled: formdata.enableCi,
            Docker: formdata.docker,
            SonarQube: formdata.sonar,
            sonarProjectKey: formdata.sonarProjectKey,
            sonarProjectName: formdata.sonarProjectName,
            sonarbuildFor: formdata.sonarbuildFor,
            azureSubscription: formdata.azureSubscription,
            scan: formdata.scan,
            gate: formdata.gate
          },
          CD:{
            Enabled: formdata.enableCd,
            azureSubscription: formdata.azureSubscrip,
            azureAppServiceName: formdata.azureAppServiceName,
            environmentName: formdata.environmentName
          }
        }
        }
      }
  ])

  
    console.log(String(doc));
    let text = btoa(String(doc))
    console.log(text);
    this.api.getSha().subscribe((res: any) => {
      console.log(res);
      let sha = res.sha;
      if (sha) {
        //update 
        this.payload = { "message": "my commit message", "sha": sha, "content": text }
        // console.log(this.payload);
        // return;
        this.api.save(this.payload).subscribe((res: any) => {
          console.log(res);
          alert('Updated')
        })
      }
    }, (err) => {
      // if (err.status == 404) {
      //insert
      this.payload = { "message": "my commit message", "content": text }
      this.api.save(this.payload).subscribe((res: any) => {
        console.log(res);
        alert('Added')
      })
      // }
    })
  }
}
