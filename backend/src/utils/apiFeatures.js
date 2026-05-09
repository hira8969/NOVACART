export default class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.keyword) {
      this.query = this.query.find({ $text: { $search: this.queryString.keyword } });
    }
    return this;
  }

  filter() {
    const copy = { ...this.queryString };
    ['keyword', 'page', 'limit', 'sort', 'fields'].forEach((field) => delete copy[field]);
    const filter = JSON.parse(JSON.stringify(copy).replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`));
    this.query = this.query.find(filter);
    return this;
  }

  sort() {
    this.query = this.query.sort(this.queryString.sort?.split(',').join(' ') || '-createdAt');
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 12;
    this.query = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }
}
