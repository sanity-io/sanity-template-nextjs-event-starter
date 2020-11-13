export default class FormError extends Error {
  constructor(public res: Response) {
    super();
  }
}
