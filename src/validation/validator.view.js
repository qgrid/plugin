import {PluginView} from '../plugin.view';
import {isString, isEqual} from '@grid/core/utility';
import * as validationService from '@grid/core/validation/validation.service';

export class ValidatorView extends PluginView {
	constructor(model, context) {
		super(model);

		this.oldErrors = [];
		this.context = context;

		if (validationService.hasRules(this.rules, this.context.key)) {
			this.validator = validationService.createValidator(this.rules, this.context.key);
		}
	}

	get errors() {
		if (this.validator) {
			const target = {
				[this.context.key]: this.context.value
			};

			const isValid = this.validator.validate(target);
			if (!isValid) {
				const newError = this.validator.getErrors()[this.context.key];
				const newErrors = isString(newError) ? [newError] : newError;
				if (!isEqual(newErrors, this.oldErrors)) {
					this.oldErrors = newErrors;
				}
			} else {
				this.oldErrors.length = 0;
			}

			return this.oldErrors;
		}
	}

	get rules() {
		return this.model.validation().rules;
	}

	get type() {
		return this.context.type;
	}

	get value() {
		return this.context.value;
	}
}
