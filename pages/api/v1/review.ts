import {NextApiRequest, NextApiResponse} from "next";
import {Review} from "../../../types";
import {postReview} from "../../../backendServices/review";
import { v4 as uuidv4 } from 'uuid';
import Cors from 'cors';

// Define a Session type
interface Session {
  ip: string;
  id: string;
}

// Extend NextApiRequest to include session of type Session
interface ExtendedApiRequest extends NextApiRequest {
  session: Session;
}

// Define type for the review response
interface ReviewResponse {
  done: boolean;
}

// Configure CORS
const cors = Cors({
  methods: ['POST'],
  origin: [
    'http://localhost:3000',
    'https://radio-crestin.com',
    'https://radiocrestin.ro',
  ],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse<ReviewResponse>,
): Promise<void> {
  await runMiddleware(req, res, cors);

  if (!req.session || !req.session.ip || !req.session.id) {
    Object.defineProperty(req, 'session', {
      value: {
        ip: (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '',
        id: uuidv4(),
      },
      writable: true,
    });
  }

  const review: Review = {
    user_name: req.query.user_name as string || req.body.user_name,
    ip_address: req.session.ip,
    session_id: req.session.id,
    station_id: req.query.station_id as string || req.body.station_id,
    stars: Number(req.query.stars) || req.body.stars,
    message: req.query.message as string || req.body.message,
  };

  try {
    const response = await postReview(review);
    res.status(200).json({done: response.done});
  } catch (error) {
    console.error('error', error);
    res.status(500).json({done: false});
  }
}
