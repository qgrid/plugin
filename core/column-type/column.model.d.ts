import { IEditorOptions } from './editor.options';

/**
 * A class that represents any column in the q-grid.
 */
export declare class ColumnModel {
	constructor(type?: string);

	/**
	 * Type of column. Beside below list user is free to define own column type.
	 * Be aware that some column types are used for internal purposes.
	 * - array
	 * - bool
	 * - currency
	 * - date
	 * - email
	 * - file
	 * - filter-row
	 * - group
	 * - id
	 * - image
	 * - number
	 * - pad
	 * - pivot
	 * - reference
	 * - row-details
	 * - row-expand
	 * - row-indicator
	 * - row-number
	 * - row-options
	 * - select
	 * - text
	 * - time
	 * - url
	 */
	type: string;

	/**
	 * Column identifier, should be unique across all columns. If path is not setup, key property is used 
	 * to retrieve a cell value.
	 */
	key: string;

	/**
	 * Column header text, also can be shown as column tooltip, or used in plugins like column filter plugin.
	 */
	title: string;

	/**
	 * Getter, setter for cell value. If value property is setup, it is used to get/set cell value. 
	 */
	value: (row: any, value?: any) => any;
	$value: (row: any, value?: any) => any;

	/**
	 * Path to the value. Example is `address.phones.0.num`, if path property is setup, it is used
	 * to get/set cell value, but it has a lower priority than column value property.
	 */
	path: string;

	/**
	 * Indicates if column should be frozen.
	 * - `'left'` - freeze a column to the grid's left.
	 * - `'right'` - freeze a column to the grids'right.
	 * - `null` - do not freeze  a column.
	 */
	pin: string;
	origin: string;
	source: string;
	class: string;

	/**
	 * Editor type, will be shown in cell edit mode instead of default column type editor. 
	 * For instance, it can be used for id type column `<q-grid-column type="id" editor="number">`.
	 */
	editor: string;

	/**
	 * Options for cell edit mode.
	 */
	editorOptions: IEditorOptions;

	/**
	 * Width of the q-grid column.
	 * 
	 * * Can be setup in pixels like `<q-grid-column width="100">`.
	 * * Can be setup in persents like `<q-grid-column width="20%"`.
	 * 
	 * Percents are materialized only once on init, and depend on grid size.
	 */
	width: number | string;

	/**
	 * Minimal width of the column.
	 */
	minWidth: number;

	/**
	 * Maximum width of the column.
	 */
	maxWidth: number;

	/**
	 * Indicates if cells in the column are editable.
	 */
	canEdit: boolean;

	/**
	 * Indicates if column is resizable.
	 */
	canResize: boolean;

	/**
	 * Indicates if sorting can be applied to the column.
	 * `Column sort` plugin is used this property to enable/disable sort arrow icons.
	 */
	canSort: boolean;

	/**
	 * Indicates if drang and drop is allowed for the column.
	 */
	canMove: boolean;

	/**
	 * Indicates if data in the column can be filtered.
	 * `Column filter` plugin is used this property to enable/disable filter icon.
	 */
	canFilter: boolean;

	/**
	 * Indicates if underneath column cells should be highlighted when mouse is over column header.
	 */
	canHighlight: boolean;

	/**
	 * Indicates if column cells can take focus.
	 */
	canFocus: boolean;

	/**
	 * Indicates if column is visible or not.
	 */
	isVisible: boolean;

	/**
	 * Indicates the order of the column.
	 */
	index: number;

	/**
	 * Indicates what text should be shown in the cell. If property is not set column value is used.
	 * Also `filter plugin` uses this property to show list of items and for filter application.
	 */
	label: (row: any, value?: any) => string;

	$label: (row: any, value?: any) => any;
}
