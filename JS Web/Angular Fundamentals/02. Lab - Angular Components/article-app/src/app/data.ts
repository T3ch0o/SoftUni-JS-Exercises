import { Article } from './models/article.model';
import { data } from './seed';

export class ArticleData {
  getData() : Article[] {
    let articles : Article[] = [];

    for (let i = 0; i < data.length; i++) {
      const currentArticle = data[i];
      articles.push(new Article(
        currentArticle.title,
        currentArticle.description,
        currentArticle.imageUrl,
        currentArticle.author
      ));
    }

    return articles;
  }
}
