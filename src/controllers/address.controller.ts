import {BaseHttpController, controller, httpPost, requestBody} from "inversify-express-utils";
import {SearchRequestDto} from "../dtos/address/searchRequestDto";
import {validateBody} from "../middleware";
import {AddressService} from "../services/address.service";
import {inject} from "inversify";

@controller('/addresses')
export class AddressController extends BaseHttpController {
    constructor(@inject(AddressService) private readonly addressService: AddressService) {
        super();
    }

    @httpPost('/search', validateBody(SearchRequestDto))
    search(@requestBody() dto: SearchRequestDto) {
        console.log('----')
        return this.addressService.search(dto);
    }
}