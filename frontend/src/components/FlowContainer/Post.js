import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function Post ({ content }) {
  return (
    <Card className='post card'>
      <CardContent>
        <div className='postTitle'>{content.title}</div>
        <hr />
        <div className='postBody'>{content.body}</div>
      </CardContent>
    </Card>
  );
}
