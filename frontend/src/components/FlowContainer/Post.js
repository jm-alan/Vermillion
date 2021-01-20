import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PostBar from './PostBar';

export default function Post ({ content }) {
  console.log(content.isHearted);
  return (
    <Card className='post card'>
      <CardContent>
        <div className='postTitle'>
          <h1>
            {content.title}
          </h1>
        </div>
        <hr />
        <div className='postBody' dangerouslySetInnerHTML={{ __html: content.body }} />
      </CardContent>
      <PostBar
        backendId={content.id}
        createdAt={content.createdAt}
        updatedAt={content.updatedAt}
        username={content.User.username}
        isHearted={content.isHearted}
      />
    </Card>
  );
}
