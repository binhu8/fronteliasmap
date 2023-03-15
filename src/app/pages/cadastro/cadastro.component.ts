import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAdressService } from 'src/app/services/get-adress.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RedeService } from 'src/app/services/rede.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  form: FormGroup = this.formBuilder.group({
    rede: ['', Validators.required],
    lojas: this.formBuilder.array([])
  });

  get lojas(){
    return this.form.controls['lojas'] as FormArray
  }

  constructor(
    private formBuilder: FormBuilder,
    private getAdressService: GetAdressService,
    private redeService: RedeService,
    private notificationService: NotificationService
  ){}

  addLoja(){
    const lojaForm: FormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      contato: ['', Validators.required],
      endereco: this.formBuilder.group({
          cep: [''],
          logradouro: ['', Validators.required],
          numero:[''],
          bairro:['', Validators.required],
          localidade: ['', Validators.required],
          uf: ['',Validators.required]
      })
    });

    this.lojas.push(lojaForm)
  }

  getAdressByCEP(cep, formGroup: any){
    
    this.getAdressService.getAdressByCEP(cep).subscribe(res => {
      formGroup.patchValue({endereco: res})
    })
  }

  teste(){
    console.log(this.form.value)
  }

  addRede(){
    this.redeService.cadastrarRede(this.form.value).subscribe(res => {
      this.form.reset()
      this.notificationService.showNotification('Rede cadastrada com sucesso')
    })
  }

}
