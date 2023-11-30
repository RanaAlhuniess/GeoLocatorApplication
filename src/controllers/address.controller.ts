import {BaseHttpController, controller, httpPost, requestBody} from "inversify-express-utils";
import {SearchRequestDto} from "../dtos/address/searchRequestDto";
import {validateBody} from "../middleware";

@controller('/addresses')
export class AddressController extends BaseHttpController {
    @httpPost('/search', validateBody(SearchRequestDto))
    search(@requestBody() dto: SearchRequestDto) {
        console.log('----')
        return ['dddd'];
    }
}