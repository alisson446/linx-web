import { queryClient, generateQueryClient } from "./queryClient";

const keys = {
  financeiroFornecedor: "financeiroFornecedor",
  financeiroExcursao: "financeiroExcursao",
  financeiroPacote: "financeiroPacote",
  financeiroVendas: "financeiroVendas",
  comissao: "comissao",
  configuracao: "configuracao",
  opcionalEmbarque: "opcionalEmbarque",
  creditoCliente: "creditoCliente",
  logs: "logs",
  vendas: "vendas",
  relatorioClientes: "relatorioClientes",
  rankingCliente: "rankingCliente",
  usuario: "usuario",
  excursaoQuartoPassageiro: "excursaoQuartoPassageiro",
  excursaoOnibus: "excursaoOnibus",
  subCategoriaTransacao: "subCategoriaTransacao",
  reserva: "reserva",
  contaBancaria: "contaBancaria",
  categoriaTransacao: "categoriaTransacao",
  tipoQuarto: "tipoQuarto",
  pessoas: "pessoas",
  financeiro: "financeiro",
  financeiroCategorias: "financeiroCategorias",
  formaPagamento: "formaPagamento",
  localEmbarque: "localEmbarque",
  excursaoEmbarque: "excursaoEmbarque",
  excursaoPassageiro: "excursaoPassageiro",
  excursaoQuarto: "excursaoQuarto",
  excursao: "excursao",
  products: "products",
  pacotes: "pacotes",
  fornecedores: "fornecedores",
  home: "home",
  company: "company",
  collaborator: "collaborator",
  dependents: "dependents",
  financial: "financial",
  wallet: "wallet",
  benefits: "benefits",
  report: "report",
  sector: "sector",
  partners: "partners",
  needHelp: "needHelp",
  topics: "topics",
  supportNotifications: "supportNotifications",
  preRegistration: "preRegistration",
  hub: "hub",
  message: "message",
  corretorsHubs: "corretorsHubs",
  corretorsCompany: "corretorsCompany",
  contract: "contract",
  parentage: "parentage",
  civilStatus: "civilStatus",
  reasons: "reasons",
  productAdhesion: "productAdhesion",
  commonQuestions: "commonQuestions",
  reasonsInactivation: "reasonsInactivation",
  segmentation: "segmentation",
  videoPlayer: "videoPlayer",
  permissions: "permissions",
  userManagement: "userManagement",
  hasForm: "hasForm",
  brokerList: "brokerList",
  supplier: "supplier",
  occupation: "occupation",
  personDocuments: "personDocuments",
  getDocument: "getDocument",
  benefitDetails: "benefitDetails",
  proposalAdherence: "proposalAdherence",
  partnerships: "partnerships",
  providers: "providers",
  providersProducts: "providersProducts",
  legalRepresentative: "legalRepresentative",
  legalDocuments: "legalDocuments",
  signatures: "signatures",
  beneficiariesAgeGroups: "beneficiariesAgeGroups",
  notifications: "nofitications"
};

export { keys, queryClient, generateQueryClient };