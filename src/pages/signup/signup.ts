import { CepDTO } from "./../../models/cep.dto";
import { CepService } from "./../../services/cep.service";
import { CidadeDTO } from "./../../models/cidade.dto";
import { EstadoDTO } from "./../../models/estado.dto";
import { EstadoService } from "./../../services/domain/estado.service";
import { CidadeService } from "./../../services/domain/cidade.service";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
} from "ionic-angular";

// ================================================= //
@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  // ================================================= //
  formGroup: FormGroup;
  // ================================================= //
  estados: EstadoDTO[];
  // ================================================= //
  cidades: CidadeDTO[];
  // ================================================= //
  cepDto: CepDTO;
  // ================================================= //
  cep: string;
  // ================================================= //
  siglaEstado: string;
  // ================================================= //
  cidadeId: string;
  // ================================================= //
  estadoId: string;
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public cepService: CepService,
    public alertController: AlertController
  ) {
    this.formGroup = this.formBuilder.group({
      nome: [
        "Joaquim",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      email: ["joaquim@gmail.com", [Validators.required, Validators.email]],
      tipo: ["1", [Validators.required]],
      cpfOuCnpj: [
        "06134596280",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      senha: ["123", [Validators.required]],
      logradouro: ["Rua Via", [Validators.required]],
      numero: ["25", [Validators.required]],
      complemento: ["Apto 3", []],
      bairro: ["Copacabana", []],
      cep: ["10828333", [Validators.required, Validators.minLength(8)]],
      telefone1: ["977261827", [Validators.required]],
      telefone2: ["", []],
      telefone3: ["", []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
    });
  }
  // ================================================= //
  signupUser() {
    console.log("Enviou o form");
  }
  // ================================================= //
  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(
      (response) => {
        this.estados = response;
        this.estados.sort((a: EstadoDTO, b: EstadoDTO) => {
          return a.nome.localeCompare(b.nome);
        });
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      (error) => {}
    );
  }
  // ================================================= //
  updateCidades() {
    this.cidadeService.findAll(this.estadoId).subscribe(
      (response) => {
        this.cidades = response;
        this.cidades.sort((a: CidadeDTO, b: CidadeDTO) => {
          return a.nome.localeCompare(b.nome);
        });
        if (!this.cidadeId) {
          this.formGroup.controls.cidadeId.setValue(null);
        }
      },
      (error) => {}
    );
  }
  // ================================================= //
  updateEnderecos() {
    this.cepService.findByCep(this.cep).subscribe(
      (response) => {
        if (response.erro) {
          let alert = this.alertController.create({
            title: "Erro: CEP inválido!",
            message: "Informe o cep corretamente",
            enableBackdropDismiss: false,
            buttons: [
              {
                text: "OK",
              },
            ],
          });
          alert.present();
        }
        this.cepDto = response;
        this.siglaEstado = this.cepDto.uf;
        this.formGroup.controls.logradouro.setValue(this.cepDto.logradouro);
        this.formGroup.controls.complemento.setValue(this.cepDto.complemento);
        this.formGroup.controls.bairro.setValue(this.cepDto.bairro);
        this.buscaEstado();
      },
      (error) => {}
    );
  }
  // ================================================= //
  buscaEstado() {
    this.estadoService.findOneBySigla(this.siglaEstado).subscribe(
      (response) => {
        this.estadoId = response.id;
        this.formGroup.controls.estadoId.setValue(response.id);
        for (const c of this.cidades) {
          if (c.nome == this.cepDto.localidade) {
            this.formGroup.controls.cidadeId.setValue(c.id);
            this.cidadeId = c.id;
            this.updateCidades();
          }
        }
      },
      (error) => {}
    );
  }
}
