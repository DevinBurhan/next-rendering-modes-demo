import axios from "axios";
import { useRouter } from "next/router";
import { Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API_ENDPOINT, SUPABASE_KEY } from "../../../constant";

const fetchCar = async ({ queryKey }) => {
  const [_, id] = queryKey;
  // const { data } = await axios.get(`/api/cars?id=${escape(id)}`);

  const { data } = await axios.get(`${API_ENDPOINT}/cars?id=eq.${id}`, {
    headers: {
      apikey: SUPABASE_KEY,
    },
  });

  return data[0];
};

const Car = () => {
  const router = useRouter();
  const { data } = useQuery(["cars.byName", router.query.id], fetchCar);

  return (
    <div>
      <Container>
        {data && (
          <>
            <Row>
              <img
                src={`/cars/${data.id}.jpg`}
                style={{
                  width: "100%",
                }}
              />
            </Row>
            <Row>
              <h1 className="text-center">
                {(data && data.name) || "SuperCar"}
              </h1>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Car;
