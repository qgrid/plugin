import {PluginView} from '../plugin.view';

export class AutofocusView extends PluginView {
	constructor(model, table, markup) {
		super(model);

		this.using(model.sceneChanged.watch((e, off) => {
			if (e.hasChanges('status')) {
				if (e.state.status === 'stop') {
					const count = table.body.rowCount(0);
					if (count) {
						off();

						const key = Object.keys(markup).find(p => p.startsWith('body'));
						if (key) {
							const element = markup[key];
							if (element) {
								element.focus();
							}
						}

						const body = table.body;
						const focus = model.focus;
						const focusState = focus();
						const cell = body.cell(focusState.rowIndex, focusState.columnIndex);
						const cellModel = cell.model();
						if (!cellModel || !cellModel.column.canFocus) {
							let rowIndex = 0;
							while (true) { // eslint-disable-line no-constant-condition
								const row = body.row(rowIndex);
								if (!row.model()) {
									break;
								}

								const cells = row.cells();
								const columnIndex = cells.findIndex(c => {
									const m = c.model();
									return m && m.column.canFocus;
								});

								if (columnIndex >= 0) {
									focus({rowIndex, columnIndex});
									break;
								}

								rowIndex++;
							}
						}
					}
				}
			}
		}));
	}
}
