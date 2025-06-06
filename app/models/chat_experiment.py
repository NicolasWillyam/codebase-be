from langchain_google_genai import ChatGoogleGenerativeAI
import os 
from dotenv import load_dotenv

load_dotenv()

large_language_multimodality = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash", 
    temperature=0.7, 
    max_tokens=500,
    top_k=0.55
)

user_input = """Hà Giang là một tỉnh miền núi nằm ở cực Bắc của Việt Nam, 
nổi tiếng với cảnh quan thiên nhiên hùng vĩ, những dãy núi đá tai mèo kỳ vĩ và văn hóa đa dạng của các dân tộc thiểu số 
như H'Mông, Dao, Tày. Du khách đến Hà Giang không chỉ bị cuốn hút bởi con đường đèo Mã Pí Lèng 
– một trong “tứ đại đỉnh đèo” của Việt Nam – mà còn bởi những thửa ruộng bậc thang trải dài trên các sườn núi, 
đặc biệt vào mùa lúa chín. Hà Giang còn là nơi lưu giữ nhiều giá trị truyền thống qua các lễ hội đặc sắc, 
trang phục thổ cẩm rực rỡ, và những nếp nhà trình tường độc đáo. Với khí hậu mát mẻ quanh năm, 
Hà Giang còn thu hút các nhà thám hiểm, nhiếp ảnh gia, và người yêu thiên nhiên khám phá các bản làng xa xôi, 
những con suối trong vắt và các hang động bí ẩn. Việc phát triển du lịch cộng đồng tại đây cũng giúp cải thiện đời 
sống người dân địa phương, đồng thời bảo tồn văn hóa và môi trường. Hà Giang thực sự là một điểm đến đầy tiềm năng 
và mê hoặc cho những ai yêu thích khám phá và trải nghiệm."""

for chunk in large_language_multimodality.stream(user_input):
    print(chunk.content, end = '|', flush=True)


