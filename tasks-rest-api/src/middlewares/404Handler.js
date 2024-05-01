import NotFoundException from '../exceptions/NotFoundException';

export default function middleware(req, res, next) {
  const err = new NotFoundException();
  next(err);
}
