import ApiService from "../api-services";

class CompanionService {
  public static async getCompanions(): Promise<CompanionsData> {
    return await ApiService.get<CompanionsData>(
      "v1/companion/companion/details"
    );
  }
}

export default CompanionService;
