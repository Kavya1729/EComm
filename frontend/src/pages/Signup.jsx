import {React,useState} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff,Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted: ", formData);
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, formData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(res.data.success){
        navigate('/verify');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error while registering user: ", error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create new account!
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Akshay"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Kumar"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Create a password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  {showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(false)}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"
                    />
                  )}
                </div>
              </div>
            </div>
          
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            onClick={submitHandler}
            className="w-full bg-blue-900 hover:bg-blue-800 cursor-pointer"
            disabled={loading}
          >
            {loading ?<> <Loader2 className='h-4 w-4 animate-spin' />Please Wait</>:"Sign Up"}
          </Button>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-900 cursor-pointer hover:underline  hover:text-blue-700 font-bold"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
