import { Observable } from "rxjs/Rx";
import { CidadeModel } from "./../../models/cidade.model";
import { CepDTO } from "./../../models/cep.dto";
import { CepService } from "./../../services/domain/cep.service";
import { CidadeDTO } from "./../../models/cidade.dto";
import { EstadoDTO } from "./../../models/estado.dto";
import { EstadoService } from "./../../services/domain/estado.service";
import { CidadeService } from "./../../services/domain/cidade.service";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ClienteService } from "../../services/domain/cliente.service";
import { Subject } from "rxjs";
import { AlertUtilsService } from "../../utils/alert.utils";

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
  cepFrontEnd: string;
  // ================================================= //
  cepDto: CepDTO;
  // ================================================= //
  estadoFrontEnd: string;
  // ================================================= //
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public cepService: CepService,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertUtils: AlertUtilsService
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
      cep: ["58038151", [Validators.required, Validators.minLength(8)]],
      telefone1: ["977261827", [Validators.required]],
      telefone2: ["", []],
      telefone3: ["", []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
    });
  }
  // ================================================= //
  signupUser() {
    this.clienteService.insert(this.formGroup.value).subscribe(
      (resonse) => {
        let title: string = "Sucesso!";
        let message: string = "Cadastro realizado com sucesso!";
        this.alertUtils.showAlert(title, message);
        this.navCtrl.pop();
      },
      (error) => {}
    );
  }
  // ================================================= //
  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(
      (response) => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.getEstadoById(this.estados[0].id).subscribe(
          (response) => {
            let estadoDto: EstadoDTO = response;
            this.getInfoEstado(estadoDto.sigla);
          },
          (error) => {}
        );
      },
      (error) => {}
    );
  }
  // ================================================= //
  updateCidades(cidadesDto: CidadeDTO[]) {
    this.cidades = cidadesDto;
    this.cidades.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
  }
  // ================================================= //
  updateEnderecoByCep() {
    this.cepService.findEndereco(this.cepFrontEnd).subscribe(
      (response) => {
        if (response.erro) {
          let title: string = "Erro!";
          let message: string = "CEP inválido. Informe o CEP novamente";
          this.alertUtils.showAlert(title, message);
          return;
        }
        this.cepDto = response;
        this.getInfoEstadoViaCep(this.cepDto.uf);
      },
      (error) => {}
    );
  }
  // ================================================= //
  getInfoEstadoViaCep(sigla: string) {
    this.estadoService.findOneBySigla(sigla).subscribe(
      (response) => {
        let estadoDto: EstadoDTO = response;
        this.estadoService.findAllCidades(estadoDto.id).subscribe(
          (response) => {
            this.updateCidades(response);
            this.updateForm(estadoDto);
          },
          (error) => {}
        );
      },
      (error) => {}
    );
  }
  // ================================================= //
  getInfoEstado(sigla: string) {
    this.estadoService.findOneBySigla(sigla).subscribe(
      (response) => {
        let estadoDto: EstadoDTO = response;
        this.estadoService.findAllCidades(estadoDto.id).subscribe(
          (response) => {
            this.updateCidades(response);
          },
          (error) => {}
        );
      },
      (error) => {}
    );
  }
  // ================================================= //
  insertCidade() {
    let estado: EstadoDTO = {
      id: this.formGroup.controls["estadoId"].value,
      nome: null,
      sigla: null,
    };
    let cidade: CidadeModel = {
      id: null,
      nome: this.cepDto.localidade,
      estado: estado,
    };
    this.cidadeService.insert(cidade).subscribe(
      (response) => {
        let cidadeAux: CidadeDTO = {
          id: response.body["id"],
          nome: response.body["nome"],
        };
        this.cidades.push(cidadeAux);
        this.cidades.sort((a, b) => {
          return a.nome.localeCompare(b.nome);
        });
        this.updateCidadesDoEstado(this.cidades[this.cidades.length - 1].id);
        this.formGroup.controls.cidadeId.setValue(cidadeAux.id);
      },
      (error) => {
        console.log("Erro ao inserir cidade.\n", error);
      }
    );
  }
  // ================================================= //
  updateCidadesDoEstado(cidadeId: string) {
    let estadoId = this.formGroup.controls["estadoId"].value;
    this.estadoService.updateCidadesDoEstado(estadoId, cidadeId).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }
  // ================================================= //
  updateForm(estadoDto: EstadoDTO) {
    this.formGroup.controls.estadoId.setValue(estadoDto.id);
    this.formGroup.controls.logradouro.setValue(this.cepDto.logradouro);
    this.formGroup.controls.complemento.setValue(this.cepDto.complemento);
    this.formGroup.controls.bairro.setValue(this.cepDto.bairro);
    let temCidade = false;
    for (const cidade of this.cidades) {
      if (cidade.nome === this.cepDto.localidade) {
        temCidade = true;
        this.formGroup.controls.cidadeId.setValue(cidade.id);
      }
    }
    if (!temCidade) {
      this.insertCidade();
    }
    this.updateCidadesFrontEnd(estadoDto.id);
  }
  // ================================================= //
  getEstadoById(estadoId: string): Observable<EstadoDTO> {
    let estadoDto: EstadoDTO;
    var subject = new Subject<EstadoDTO>();
    this.estadoService.findOneById(estadoId).subscribe(
      (response) => {
        estadoDto = response;
        subject.next(estadoDto);
      },
      (error) => {
        return null;
      }
    );
    return subject.asObservable();
  }
  // ================================================= //
  updateCidadesFrontEnd(estadoId: string) {
    this.getEstadoById(estadoId).subscribe(
      (response) => {
        let estadoDto: EstadoDTO = response;
        this.getInfoEstado(estadoDto.sigla);
      },
      (error) => {}
    );
  }
}
