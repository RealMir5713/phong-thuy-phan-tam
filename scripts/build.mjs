import { mkdir, rm, writeFile, copyFile, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const site = {
  name: "Phong Thủy Phan Tâm",
  tagline: "Tư vấn phong thủy nhà ở, kinh doanh & ngày tốt",
  baseUrl: "https://phong-thuy-phan-tam.vercel.app",
  facebook: "https://www.facebook.com/tamkieu.tuanquynhviet",
  messenger: "https://m.me/tamkieu.tuanquynhviet",
  phoneDisplay: "0925987301",
  phoneTel: "0925987301",
  zalo: "https://zalo.me/0925987301",
  image: "/assets/phan-tam-facebook.jpg"
};

const navItems = [
  ["Dịch vụ", "/#dich-vu"],
  ["Quy trình", "/#quy-trinh"],
  ["Bảng giá", "/#bang-gia"],
  ["Bài viết", "/#blog"],
  ["FAQ", "/#faq"],
  ["Đặt lịch", "/#dat-lich"]
];

const services = [
  {
    slug: "tu-van-phong-thuy-nha-o",
    shortTitle: "Phong thủy nhà ở",
    icon: "Nhà",
    cardText: "Xem phong thủy nhà ở theo tuổi gia chủ, hướng nhà, công năng và cách sinh hoạt thực tế.",
    eyebrow: "Tư vấn phong thủy nhà ở",
    title: "Tư vấn phong thủy nhà ở phù hợp tuổi gia chủ và không gian sinh hoạt",
    description:
      "Dịch vụ tư vấn phong thủy nhà ở giúp gia chủ tham khảo định hướng về hướng, cửa, bếp, bàn thờ, phòng ngủ và bố trí nội thất hài hòa.",
    who: [
      "Gia đình chuẩn bị xây nhà, sửa nhà, mua nhà hoặc chuyển về nhà mới.",
      "Gia chủ đang ở trong nhà nhưng muốn rà soát lại hướng, công năng và cách bố trí.",
      "Người cần một góc nhìn phong thủy dễ hiểu trước khi làm việc với kiến trúc sư, thầu xây dựng hoặc đơn vị nội thất."
    ],
    problems: [
      "Phân vân hướng nhà, hướng cửa, hướng bếp hoặc vị trí bàn thờ có phù hợp với tuổi không.",
      "Không biết nên ưu tiên yếu tố phong thủy nào khi mặt bằng đã cố định.",
      "Nhà đang ở có cảm giác bất tiện, thiếu hài hòa nhưng chưa rõ nên điều chỉnh từ đâu.",
      "Gia đình có nhiều ý kiến khác nhau và cần một cách giải thích bình tĩnh, dễ thống nhất."
    ],
    info: [
      "Năm sinh của gia chủ và các thành viên chính nếu cần đối chiếu.",
      "Địa chỉ/khu vực, hướng nhà hoặc hướng cửa chính nếu đã biết.",
      "Mặt bằng, ảnh chụp, video hoặc mô tả từng khu vực quan trọng.",
      "Mục tiêu tư vấn: xây mới, sửa nhà, nhập trạch, bố trí lại nội thất hoặc kiểm tra tổng thể."
    ],
    receives: [
      "Nhận xét phong thủy tổng quan về hướng, luồng di chuyển và các khu vực chính.",
      "Gợi ý điều chỉnh theo mức độ ưu tiên, dễ áp dụng và phù hợp không gian thực tế.",
      "Lưu ý cho cửa chính, bếp, bàn thờ, phòng ngủ, phòng khách và khu vực làm việc.",
      "Tóm tắt sau tư vấn để gia chủ thuận tiện trao đổi lại với gia đình hoặc đội thi công."
    ],
    process: ["Gửi thông tin", "Đọc mặt bằng", "Trao đổi tư vấn", "Gợi ý điều chỉnh"],
    faqs: [
      ["Nhà đang ở có tư vấn phong thủy được không?", "Có. Với nhà đang ở, tư vấn tập trung vào những điều chỉnh vừa sức như vị trí đồ đạc, cách dùng phòng, ánh sáng, luồng đi lại và các khu vực cần giữ gọn gàng."],
      ["Không biết chính xác hướng nhà thì sao?", "Anh/chị có thể gửi vị trí trên bản đồ, ảnh cửa chính hoặc video ngắn. Nếu cần độ chính xác cao, nên đo lại bằng la bàn hoặc thiết bị chuyên dụng."],
      ["Có cần thay đổi kết cấu nhà không?", "Không mặc định. Tư vấn ưu tiên gợi ý thực tế, hạn chế can thiệp lớn nếu chưa có đánh giá kỹ thuật xây dựng chuyên nghiệp."]
    ]
  },
  {
    slug: "xem-huong-nha-hop-tuoi",
    shortTitle: "Xem hướng nhà hợp tuổi",
    icon: "Hướng",
    cardText: "Xem hướng nhà hợp tuổi, hướng cửa, hướng bếp, hướng bàn thờ theo mục tiêu và mặt bằng.",
    eyebrow: "Xem hướng nhà hợp tuổi",
    title: "Xem hướng nhà hợp tuổi để hỗ trợ gia chủ chọn phương án an tâm hơn",
    description:
      "Dịch vụ xem hướng nhà hợp tuổi hỗ trợ gia chủ tham khảo hướng nhà, hướng cửa, hướng bếp và hướng bàn thờ trước khi mua, xây hoặc bố trí lại không gian.",
    who: [
      "Người chuẩn bị mua đất, mua nhà phố, xây nhà hoặc chọn căn hộ.",
      "Gia chủ cần kiểm tra hướng nhà, hướng cửa, hướng bếp, hướng bàn thờ trước khi quyết định.",
      "Gia đình muốn so sánh nhiều phương án để chọn lựa hợp lý hơn."
    ],
    problems: [
      "Không rõ hướng nhà đang xét có hợp tuổi gia chủ hay không.",
      "Mặt tiền, cửa chính và bếp không cùng một hướng nên khó quyết định.",
      "Căn nhà có ưu điểm về vị trí nhưng gia đình băn khoăn về phong thủy.",
      "Có nhiều lời khuyên khác nhau khiến gia chủ khó chọn phương án cuối."
    ],
    info: [
      "Năm sinh âm lịch hoặc dương lịch của gia chủ.",
      "Hướng nhà/hướng cửa chính đang xét và ảnh mặt tiền nếu có.",
      "Sơ đồ tầng trệt, vị trí bếp, bàn thờ và phòng ngủ chính.",
      "Các lựa chọn khác nếu đang so sánh nhiều căn hoặc nhiều phương án thiết kế."
    ],
    receives: [
      "Đánh giá tham khảo về hướng nhà hợp tuổi và mức độ ưu tiên khi ra quyết định.",
      "Gợi ý hướng bếp, hướng bàn thờ, bàn làm việc hoặc vị trí quan trọng nếu phù hợp.",
      "Phương án xử lý mềm khi hướng nhà chưa thật thuận lợi nhưng không thể đổi.",
      "Giải thích bằng ngôn ngữ dễ hiểu, tránh gây hoang mang."
    ],
    process: ["Xác định tuổi", "Đối chiếu hướng", "Xem mặt bằng", "Chốt gợi ý"],
    faqs: [
      ["Nên xem hướng theo tuổi ai trong nhà?", "Thông thường ưu tiên người đứng tên, người chủ sự hoặc người có vai trò chính trong gia đình. Trường hợp đặc biệt có thể trao đổi thêm để chọn cách xét phù hợp."],
      ["Căn hộ chung cư xem hướng cửa hay ban công?", "Tùy trường phái và thực tế căn hộ. Buổi tư vấn sẽ xem cả cửa, ban công, luồng sáng, công năng và cách sinh hoạt để đưa ra gợi ý cân bằng hơn."],
      ["Hướng không hợp có bắt buộc bỏ căn nhà không?", "Không. Phong thủy chỉ là một phần tham khảo. Cần cân nhắc thêm pháp lý, tài chính, vị trí, kỹ thuật xây dựng và nhu cầu sống thật của gia đình."]
    ]
  },
  {
    slug: "tu-van-phong-thuy-kinh-doanh",
    shortTitle: "Phong thủy kinh doanh",
    icon: "KD",
    cardText: "Tư vấn phong thủy kinh doanh cho cửa hàng, văn phòng, quầy thu ngân, bàn làm việc và ngày khai trương.",
    eyebrow: "Tư vấn phong thủy kinh doanh",
    title: "Tư vấn phong thủy kinh doanh, cửa hàng và văn phòng theo hướng thực tế",
    description:
      "Dịch vụ tư vấn phong thủy kinh doanh hỗ trợ chủ cửa hàng, văn phòng và doanh nghiệp bố trí không gian làm việc hài hòa, dễ vận hành và phù hợp mục tiêu.",
    who: [
      "Chủ cửa hàng, showroom, quán ăn, spa, văn phòng hoặc công ty nhỏ.",
      "Người chuẩn bị khai trương, chuyển địa điểm hoặc cải tạo mặt bằng.",
      "Chủ kinh doanh muốn sắp xếp quầy thu ngân, bàn làm việc, khu tiếp khách và lối đi hợp lý hơn."
    ],
    problems: [
      "Mặt bằng đẹp nhưng bố trí quầy, lối vào hoặc bàn làm việc chưa thuận tiện.",
      "Không biết chọn ngày khai trương, hướng bàn chủ, vị trí thu ngân hoặc khu trưng bày thế nào.",
      "Không gian làm việc thiếu hài hòa, khó tập trung hoặc khó tạo cảm giác tin cậy cho khách.",
      "Muốn phong thủy hỗ trợ quyết định nhưng không muốn nghe lời hứa phóng đại."
    ],
    info: [
      "Tuổi của chủ kinh doanh hoặc người điều hành chính.",
      "Ngành nghề, loại hình kinh doanh và mục tiêu của mặt bằng.",
      "Địa chỉ/khu vực, hướng cửa, sơ đồ mặt bằng, ảnh/video không gian.",
      "Thời gian dự kiến khai trương, chuyển địa điểm hoặc cải tạo."
    ],
    receives: [
      "Nhận xét về cửa vào, lối đi, quầy thu ngân, khu trưng bày, bàn chủ và khu tiếp khách.",
      "Gợi ý bố trí theo phong thủy nhưng vẫn tôn trọng trải nghiệm khách hàng và vận hành.",
      "Lưu ý chọn ngày tốt khai trương hoặc thời điểm quan trọng nếu có nhu cầu.",
      "Danh sách ưu tiên điều chỉnh để chủ kinh doanh triển khai từng bước."
    ],
    process: ["Nắm mô hình", "Xem mặt bằng", "Tư vấn bố trí", "Theo dõi điều chỉnh"],
    faqs: [
      ["Có tư vấn phong thủy online cho cửa hàng được không?", "Có. Anh/chị gửi video quay từ cửa vào, mặt bằng và ảnh các khu vực chính. Nếu cần khảo sát trực tiếp, hai bên có thể thống nhất lịch riêng."],
      ["Phong thủy kinh doanh có đảm bảo doanh thu không?", "Không. Tư vấn chỉ mang tính tham khảo định hướng, hỗ trợ bố trí và ra quyết định. Kết quả kinh doanh còn phụ thuộc sản phẩm, quản trị, tài chính, marketing và thị trường."],
      ["Có thể xem ngày khai trương cùng gói này không?", "Có thể kết hợp nếu anh/chị gửi tuổi người chủ sự và khoảng thời gian dự kiến khai trương."]
    ]
  },
  {
    slug: "chon-ngay-tot-khai-truong-nhap-trach-dong-tho",
    shortTitle: "Chọn ngày tốt",
    icon: "Ngày",
    cardText: "Chọn ngày tốt khai trương, nhập trạch, động thổ, cưới hỏi theo tuổi, việc cần làm và lịch thực tế.",
    eyebrow: "Chọn ngày tốt",
    title: "Chọn ngày tốt khai trương, nhập trạch, động thổ và cưới hỏi",
    description:
      "Dịch vụ chọn ngày tốt hỗ trợ xem ngày khai trương, xem ngày nhập trạch, xem ngày động thổ và các mốc quan trọng theo tuổi, mục tiêu và lịch thực tế.",
    who: [
      "Gia đình chuẩn bị động thổ, nhập trạch, sửa nhà, cưới hỏi hoặc ký kết việc quan trọng.",
      "Chủ kinh doanh chuẩn bị khai trương, mở bán, chuyển văn phòng hoặc ra mắt dịch vụ.",
      "Người có lịch gấp cần lọc một số ngày phù hợp trong khoảng thời gian giới hạn."
    ],
    problems: [
      "Có quá nhiều ngày được gợi ý nhưng không biết ngày nào phù hợp với tuổi và hoàn cảnh.",
      "Ngày đẹp theo lịch nhưng khó tổ chức vì vướng công việc, gia đình hoặc mặt bằng.",
      "Cần phương án dự phòng nếu ngày ưu tiên không thể thực hiện.",
      "Gia đình muốn lời giải thích rõ ràng để dễ thống nhất."
    ],
    info: [
      "Năm sinh của người chủ sự hoặc các bên liên quan.",
      "Loại việc cần xem: khai trương, nhập trạch, động thổ, cưới hỏi, ký hợp đồng.",
      "Khoảng thời gian có thể thực hiện và các ngày cần tránh.",
      "Yêu cầu về giờ, địa điểm hoặc lịch tổ chức nếu đã có."
    ],
    receives: [
      "Danh sách ngày và khung giờ tham khảo phù hợp với phạm vi đã cung cấp.",
      "Lý do chọn ngày theo cách diễn giải dễ hiểu, tránh nói mơ hồ.",
      "Ngày dự phòng để gia đình hoặc doanh nghiệp linh hoạt hơn.",
      "Lưu ý chuẩn bị trước ngày quan trọng để quá trình diễn ra gọn gàng."
    ],
    process: ["Gửi tuổi và việc", "Lọc khoảng ngày", "Chọn ngày phù hợp", "Xác nhận lịch"],
    faqs: [
      ["Xem ngày khai trương cần tuổi ai?", "Nên gửi tuổi của người chủ sự, chủ doanh nghiệp hoặc người chịu trách nhiệm chính cho hoạt động khai trương."],
      ["Xem ngày nhập trạch cần những thông tin gì?", "Cần tuổi gia chủ, địa chỉ/khu vực, khoảng ngày dự kiến chuyển vào và các ràng buộc lịch của gia đình."],
      ["Có thể xem ngày gấp trong ngày không?", "Có thể xem xét tùy lịch và độ đầy đủ của thông tin. Nếu việc quan trọng, anh/chị nên liên hệ sớm để có nhiều phương án hơn."]
    ]
  },
  {
    slug: "tu-van-phong-thuy-can-ho-chung-cu",
    shortTitle: "Phong thủy căn hộ",
    icon: "Căn hộ",
    cardText: "Tư vấn phong thủy căn hộ chung cư: cửa, ban công, bếp, bàn thờ, phòng ngủ và nội thất.",
    eyebrow: "Tư vấn phong thủy căn hộ chung cư",
    title: "Tư vấn phong thủy căn hộ chung cư trước khi mua, nhận nhà hoặc bố trí nội thất",
    description:
      "Dịch vụ tư vấn phong thủy căn hộ giúp người mua chung cư tham khảo hướng, công năng và bố trí nội thất hài hòa với tuổi, diện tích và nhu cầu gia đình.",
    who: [
      "Người chuẩn bị mua căn hộ, nhận bàn giao hoặc làm nội thất.",
      "Gia đình sống trong căn hộ nhỏ cần bố trí bếp, bàn thờ, giường ngủ và bàn làm việc hợp lý.",
      "Chủ nhà muốn kiểm tra phong thủy căn hộ trước khi cho thuê, bán lại hoặc ở lâu dài."
    ],
    problems: [
      "Không biết căn hộ nên xem hướng cửa, ban công hay luồng sáng chính.",
      "Bếp, bàn thờ và phòng ngủ bị giới hạn bởi mặt bằng có sẵn.",
      "Diện tích nhỏ nên khó bố trí nội thất theo nhiều lời khuyên khác nhau.",
      "Muốn nhận gợi ý thực tế, không phải thay đổi quá nhiều."
    ],
    info: [
      "Năm sinh gia chủ hoặc người ở chính.",
      "Mã căn, tầng, hướng cửa, hướng ban công nếu biết.",
      "Mặt bằng căn hộ, bản vẽ nội thất hoặc ảnh/video hiện trạng.",
      "Nhu cầu: mua mới, nhận nhà, làm nội thất, nhập trạch hoặc bố trí lại."
    ],
    receives: [
      "Nhận xét về cửa, ban công, bếp, bàn thờ, phòng ngủ, khu làm việc và luồng sinh hoạt.",
      "Gợi ý bố trí nội thất theo phong thủy phòng bếp, bàn thờ và các khu vực quan trọng.",
      "Phương án ưu tiên cho căn hộ có diện tích nhỏ hoặc mặt bằng khó đổi.",
      "Lưu ý nhập trạch, dọn vào ở hoặc khai thác căn hộ nếu cần."
    ],
    process: ["Gửi mặt bằng", "Xem hướng chính", "Rà soát công năng", "Đề xuất bố trí"],
    faqs: [
      ["Mua chung cư có cần xem phong thủy không?", "Nên xem nếu anh/chị muốn có thêm góc tham khảo trước khi mua hoặc làm nội thất. Tuy vậy vẫn cần ưu tiên pháp lý, tài chính, vị trí, chất lượng xây dựng và tiện ích sống."],
      ["Không có bản vẽ mặt bằng thì làm sao?", "Có thể gửi ảnh, video quay chậm từng phòng và mô tả vị trí cửa, ban công, bếp, nhà vệ sinh, phòng ngủ."],
      ["Căn hộ nhỏ có áp dụng phong thủy được không?", "Có, nhưng cách tư vấn cần thực tế hơn: ưu tiên gọn gàng, ánh sáng, luồng đi lại, vị trí đồ quan trọng và thói quen sử dụng hằng ngày."]
    ]
  }
];

const homeServices = [
  ["Tư vấn phong thủy nhà ở", "Rà soát hướng, cửa, bếp, bàn thờ, phòng ngủ, công năng và gợi ý bố trí hài hòa."],
  ["Xem hướng nhà, hướng cửa, hướng bếp, hướng bàn thờ", "Đối chiếu tuổi gia chủ với hướng và mặt bằng để chọn cách xử lý phù hợp."],
  ["Tư vấn phong thủy căn hộ/chung cư", "Xem cửa, ban công, bếp, bàn thờ, phòng ngủ và nội thất trong điều kiện căn hộ thực tế."],
  ["Tư vấn phong thủy kinh doanh, cửa hàng, văn phòng", "Gợi ý bố trí mặt bằng, quầy thu ngân, bàn chủ, khu tiếp khách và ngày khai trương."],
  ["Chọn ngày tốt khai trương, động thổ, nhập trạch, cưới hỏi", "Xem ngày tốt theo tuổi, việc cần làm, khoảng thời gian và lịch tổ chức."],
  ["Tư vấn bố trí nội thất theo phong thủy", "Hỗ trợ sắp xếp nội thất dễ áp dụng, phù hợp với sinh hoạt và thẩm mỹ hiện đại."],
  ["Xem tuổi hợp hướng, hợp ngày, hợp việc", "Tham khảo định hướng trước các quyết định lớn trong nhà ở, công việc và gia đình."]
];

const blogPosts = [
  ["Xem hướng nhà hợp tuổi cần chuẩn bị gì?", "Những thông tin nên có trước khi hỏi hướng nhà, hướng cửa, hướng bếp và hướng bàn thờ."],
  ["Khi nào nên xem ngày tốt nhập trạch?", "Các mốc nên chuẩn bị sớm để việc chuyển vào nhà mới diễn ra chủ động hơn."],
  ["Phong thủy bàn thờ trong nhà ở cần lưu ý điều gì?", "Gợi ý tham khảo về vị trí, sự trang nghiêm và cách trao đổi trong gia đình."],
  ["Cách bố trí bếp theo phong thủy gia đình", "Những điểm thường được xem xét khi sắp xếp bếp trong nhà phố, căn hộ và nhà mới xây."],
  ["Phong thủy văn phòng giúp không gian làm việc hài hòa hơn", "Cách nhìn thực tế về bàn làm việc, lối đi, ánh sáng và khu tiếp khách."],
  ["Mua chung cư có cần xem phong thủy không?", "Các yếu tố nên cân nhắc cùng pháp lý, tài chính, vị trí và chất lượng sống."]
];

const homeFaqs = [
  ["Cần chuẩn bị thông tin gì trước khi tư vấn?", "Anh/chị nên chuẩn bị năm sinh, nhu cầu tư vấn, địa chỉ/khu vực, hướng nhà nếu biết, mặt bằng hoặc ảnh/video hiện trạng. Với chọn ngày tốt, cần thêm khoảng thời gian dự kiến và việc cần xem."],
  ["Có tư vấn online qua Zalo được không?", "Có. Tư vấn phong thủy online qua Zalo phù hợp với nhiều trường hợp nếu anh/chị gửi đủ ảnh, video, mặt bằng và câu hỏi cụ thể."],
  ["Tư vấn phong thủy nhà đang ở có được không?", "Có. Nhà đang ở thường được tư vấn theo hướng rà soát hiện trạng và gợi ý điều chỉnh vừa sức, ưu tiên những thay đổi không làm xáo trộn sinh hoạt."],
  ["Có cần bản vẽ mặt bằng không?", "Có bản vẽ thì tốt hơn, nhất là khi xây mới, sửa nhà hoặc làm nội thất. Nếu chưa có, anh/chị có thể gửi ảnh, video và mô tả vị trí các khu vực chính."],
  ["Bao lâu nhận được phân tích?", "Tùy độ phức tạp và lượng thông tin. Các nhu cầu đơn giản có thể trao đổi nhanh; hồ sơ nhà ở hoặc kinh doanh chuyên sâu cần thêm thời gian để xem kỹ."],
  ["Phong thủy có đảm bảo thay đổi vận mệnh không?", "Không. Phong thủy là thông tin tham khảo định hướng, hỗ trợ gia chủ ra quyết định và gợi ý bố trí hài hòa. Không nên xem phong thủy như lời đảm bảo chắc chắn về tài lộc, sức khỏe hay thành công."]
];

const packages = [
  ["Gói tư vấn cơ bản", "Dành cho một câu hỏi cụ thể như xem hướng, chọn ngày hoặc kiểm tra nhanh một khu vực.", "Liên hệ"],
  ["Gói tư vấn nhà ở", "Rà soát nhà phố, nhà đang ở hoặc nhà chuẩn bị xây theo hướng, mặt bằng và công năng.", "Liên hệ"],
  ["Gói tư vấn kinh doanh", "Hỗ trợ cửa hàng, văn phòng, quầy thu ngân, bàn chủ, khai trương và bố trí mặt bằng.", "Liên hệ"],
  ["Gói tư vấn chuyên sâu", "Dành cho hồ sơ cần xem nhiều yếu tố, nhiều phương án hoặc cần trao đổi theo từng giai đoạn.", "Liên hệ"]
];

const testimonials = [
  ["Chị H., Hà Nội", "Tôi cần xem hướng bếp và vị trí bàn thờ trước khi sửa nhà. Phần tư vấn rõ ràng, dễ trao đổi lại với gia đình và đội thi công."],
  ["Anh M., TP.HCM", "Tư vấn phong thủy kinh doanh rất thực tế, không nói quá. Tôi nhận được các gợi ý về quầy thu ngân, lối đi và ngày khai trương."],
  ["Gia đình cô T., Đà Nẵng", "Nhà đang ở nên không muốn thay đổi lớn. Các gợi ý chủ yếu là sắp xếp lại và giữ không gian hài hòa hơn."]
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const absolute = (url) => (url.startsWith("http") ? url : `${site.baseUrl}${url}`);

const renderJsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replaceAll("</", "<\\/")}</script>`;

const header = () => `
    <a class="skip-link" href="#main">Bỏ qua đến nội dung chính</a>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="/" aria-label="${site.name}">
          <span class="brand-mark" aria-hidden="true">PT</span>
          <span>
            <strong>${site.name}</strong>
            <span>${site.tagline}</span>
          </span>
        </a>
        <nav class="main-nav" aria-label="Điều hướng chính">
          ${navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <a class="btn btn-soft" href="${site.zalo}" target="_blank" rel="noopener">Zalo</a>
          <a class="btn" href="tel:${site.phoneTel}">Gọi ngay</a>
        </div>
      </div>
    </header>`;

const footer = () => `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <h2>${site.name}</h2>
          <p>Tư vấn phong thủy nhà ở, xem hướng nhà hợp tuổi, phong thủy kinh doanh, chọn ngày tốt và phong thủy căn hộ theo hướng thực tế, dễ hiểu.</p>
          <p class="disclaimer">Nội dung tư vấn mang tính tham khảo và định hướng, không thay thế tư vấn pháp lý, y tế, tài chính hoặc kỹ thuật xây dựng chuyên nghiệp.</p>
        </div>
        <div>
          <h3>Dịch vụ</h3>
          <div class="footer-links">
            ${services.map((service) => `<a href="/dich-vu/${service.slug}/">${service.shortTitle}</a>`).join("")}
          </div>
        </div>
        <div>
          <h3>Liên hệ</h3>
          <div class="footer-links">
            <a href="tel:${site.phoneTel}">${site.phoneDisplay}</a>
            <a href="${site.zalo}" target="_blank" rel="noopener">Đặt lịch qua Zalo</a>
            <a href="${site.facebook}" target="_blank" rel="noopener">Facebook Phan Tâm</a>
          </div>
        </div>
      </div>
    </footer>
    <nav class="mobile-cta" aria-label="Liên hệ nhanh trên di động">
      <a href="${site.zalo}" target="_blank" rel="noopener">Zalo</a>
      <a href="tel:${site.phoneTel}">Gọi</a>
      <a href="${site.messenger}" target="_blank" rel="noopener">Messenger</a>
    </nav>
    <script src="/script.js" defer></script>`;

const layout = ({ title, description, path: pagePath, body, schema = [], ogType = "website" }) => {
  const canonical = `${site.baseUrl}${pagePath}`;
  const schemas = Array.isArray(schema) ? schema : [schema];

  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${canonical}">
    <meta name="robots" content="index, follow">
    <meta property="og:type" content="${ogType}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${absolute(site.image)}">
    <meta property="og:locale" content="vi_VN">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${absolute(site.image)}">
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
    <link rel="preload" as="image" href="${site.image}">
    <link rel="stylesheet" href="/styles.css">
    ${schemas.map(renderJsonLd).join("\n    ")}
  </head>
  <body>
${header()}
    <main id="main">
${body}
    </main>
${footer()}
  </body>
</html>`;
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: site.name,
  description:
    "Tư vấn phong thủy nhà ở, xem phong thủy nhà ở, xem hướng nhà hợp tuổi, phong thủy kinh doanh, chọn ngày tốt và tư vấn phong thủy online.",
  url: site.baseUrl,
  telephone: `+84${site.phoneTel.slice(1)}`,
  image: absolute(site.image),
  areaServed: "Vietnam",
  priceRange: "$$",
  sameAs: [site.facebook],
  serviceType: [
    "tư vấn phong thủy",
    "xem phong thủy nhà ở",
    "xem hướng nhà hợp tuổi",
    "phong thủy kinh doanh",
    "chọn ngày tốt",
    "phong thủy căn hộ",
    "tư vấn phong thủy online"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+84${site.phoneTel.slice(1)}`,
    contactType: "customer service",
    availableLanguage: ["Vietnamese"]
  }
};

const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer
    }
  }))
});

const listItems = (items) => items.map((item) => `<li>${item}</li>`).join("");

const ctaBlock = (heading = "Cần xem phong thủy cho trường hợp cụ thể?") => `
  <section class="section cta-band" aria-label="Liên hệ tư vấn">
    <div class="container cta-panel">
      <div>
        <p class="eyebrow">Đặt lịch tư vấn</p>
        <h2>${heading}</h2>
        <p>Gửi thông tin qua Zalo hoặc gọi trực tiếp để Phong Thủy Phan Tâm nắm nhu cầu, hẹn lịch và tư vấn theo phạm vi phù hợp.</p>
      </div>
      <div class="cta-row">
        <a class="btn btn-gold" href="${site.zalo}" target="_blank" rel="noopener">Đặt lịch tư vấn qua Zalo</a>
        <a class="btn btn-outline light" href="tel:${site.phoneTel}">Gọi ngay ${site.phoneDisplay}</a>
      </div>
    </div>
  </section>`;

const homePage = () => {
  const body = `
      <section class="hero" aria-labelledby="hero-title">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">Phong thủy ứng dụng cho nhà ở, kinh doanh và ngày tốt</p>
            <h1 id="hero-title">Tư vấn phong thủy nhà ở, kinh doanh & ngày tốt cùng Phong Thủy Phan Tâm</h1>
            <p class="lead">Hỗ trợ gia chủ và chủ kinh doanh lựa chọn hướng, bố trí không gian, thời điểm quan trọng và giải pháp phong thủy phù hợp.</p>
            <div class="cta-row" aria-label="Liên hệ nhanh">
              <a class="btn btn-gold" href="${site.zalo}" target="_blank" rel="noopener">Đặt lịch tư vấn qua Zalo</a>
              <a class="btn btn-outline light" href="tel:${site.phoneTel}">Gọi ngay ${site.phoneDisplay}</a>
            </div>
            <div class="hero-points" aria-label="Điểm mạnh tư vấn">
              <div><strong>Kinh nghiệm thực tế</strong><span>Nhiều năm nghiên cứu và tư vấn phong thủy nhà ở, căn hộ, kinh doanh.</span></div>
              <div><strong>Ngôn ngữ dễ hiểu</strong><span>Giải thích mạch lạc, không hù dọa, không hứa kết quả tuyệt đối.</span></div>
              <div><strong>Ưu tiên ứng dụng</strong><span>Gợi ý bố trí hài hòa, phù hợp với tuổi, không gian và điều kiện thật.</span></div>
            </div>
          </div>
          <aside class="hero-card" aria-label="Thông tin chuyên gia">
            <div class="portrait-frame">
              <img src="${site.image}" alt="Ảnh đại diện công khai của Phong Thủy Phan Tâm trên Facebook" width="720" height="720">
            </div>
            <div class="hero-card-body">
              <p class="eyebrow">Thương hiệu tư vấn cá nhân</p>
              <h2>Phong Thủy Phan Tâm</h2>
              <p>Tư vấn bình tĩnh, bảo mật, tập trung vào định hướng tham khảo và những điều chỉnh có thể áp dụng trong đời sống.</p>
              <div class="meta-list">
                <div><span>Kênh tư vấn</span><strong>Zalo, điện thoại, Messenger</strong></div>
                <div><span>Phạm vi</span><strong>Nhà ở, căn hộ, kinh doanh, ngày tốt</strong></div>
                <div><span>Phong cách</span><strong>Rõ ràng, thực tế, chuyên nghiệp</strong></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section trust-section" aria-labelledby="trust-title">
        <div class="container">
          <div class="section-head center">
            <p class="eyebrow">Sự tin cậy đến từ cách làm rõ ràng</p>
            <h2 id="trust-title">Tư vấn phong thủy nên giúp gia chủ an tâm và ra quyết định sáng suốt hơn</h2>
            <p>Phong Thủy Phan Tâm đặt trọng tâm vào thông tin đầu vào, phân tích có cấu trúc và gợi ý phù hợp với hoàn cảnh thực tế của từng gia đình hoặc cơ sở kinh doanh.</p>
          </div>
          <div class="grid-4">
            <article class="card"><span class="icon-badge">01</span><h3>Nhiều năm kinh nghiệm</h3><p>Có thể cập nhật số năm kinh nghiệm cụ thể; nội dung nhấn mạnh hành trình tư vấn thực tế cho nhà ở, căn hộ và kinh doanh.</p></article>
            <article class="card"><span class="icon-badge">02</span><h3>Tư vấn bảo mật</h3><p>Thông tin về năm sinh, gia đình, mặt bằng, kế hoạch xây sửa hoặc kinh doanh được xử lý kín đáo.</p></article>
            <article class="card"><span class="icon-badge">03</span><h3>Quy trình từng bước</h3><p>Thống nhất nhu cầu, nhận dữ liệu, phân tích, tư vấn và gửi gợi ý điều chỉnh nếu cần.</p></article>
            <article class="card"><span class="icon-badge">04</span><h3>Lời khuyên dễ áp dụng</h3><p>Ưu tiên giải pháp vừa sức, không tạo áp lực thay đổi lớn khi điều kiện thực tế chưa phù hợp.</p></article>
          </div>
        </div>
      </section>

      <section id="dich-vu" class="section section-cream" aria-labelledby="services-title">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow">Dịch vụ chính</p>
            <h2 id="services-title">Tư vấn phong thủy cho những quyết định quan trọng của gia đình và công việc</h2>
            <p>Các nội dung được tối ưu SEO tự nhiên cho nhu cầu tư vấn phong thủy, xem phong thủy nhà ở, phong thủy kinh doanh, chọn ngày tốt và tư vấn phong thủy online.</p>
          </div>
          <div class="service-grid">
            ${homeServices
              .map(
                ([title, text], index) => `
            <article class="service-card">
              <span class="icon-badge">${String(index + 1).padStart(2, "0")}</span>
              <h3>${title}</h3>
              <p>${text}</p>
            </article>`
              )
              .join("")}
          </div>
          <div class="service-links" aria-label="Trang dịch vụ SEO">
            ${services.map((service) => `<a href="/dich-vu/${service.slug}/">${service.shortTitle}</a>`).join("")}
          </div>
        </div>
      </section>

      <section id="quy-trinh" class="section" aria-labelledby="process-title">
        <div class="container">
          <div class="section-head center">
            <p class="eyebrow">Quy trình tư vấn</p>
            <h2 id="process-title">Làm rõ nhu cầu trước, tư vấn đúng trọng tâm sau</h2>
            <p>Mỗi hồ sơ được xem theo dữ liệu cụ thể để tránh nói chung chung. Anh/chị có thể bắt đầu bằng Zalo, điện thoại hoặc form đặt lịch.</p>
          </div>
          <div class="timeline">
            <article><span>1</span><h3>Khách gửi thông tin</h3><p>Năm sinh, địa chỉ/hướng nhà, mặt bằng nếu có, mục tiêu cần tư vấn và thời gian mong muốn.</p></article>
            <article><span>2</span><h3>Phân tích phong thủy</h3><p>Đọc thông tin, đối chiếu tuổi, hướng, công năng và bối cảnh sinh hoạt hoặc kinh doanh.</p></article>
            <article><span>3</span><h3>Tư vấn trực tiếp</h3><p>Trao đổi qua Zalo, điện thoại hoặc gặp trực tiếp tùy phạm vi và điều kiện lịch hẹn.</p></article>
            <article><span>4</span><h3>Gửi gợi ý điều chỉnh</h3><p>Tóm tắt các điểm cần lưu ý, thứ tự ưu tiên và phương án dễ áp dụng nếu có.</p></article>
          </div>
        </div>
      </section>

      <section id="bang-gia" class="section section-green" aria-labelledby="pricing-title">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow">Gói tư vấn tham khảo</p>
            <h2 id="pricing-title">Chọn phạm vi tư vấn theo nhu cầu thật</h2>
            <p>Mức phí có thể điều chỉnh theo độ phức tạp, số lượng câu hỏi, hình thức tư vấn và thời gian chuẩn bị hồ sơ.</p>
          </div>
          <div class="pricing-grid">
            ${packages
              .map(
                ([name, text, price]) => `
            <article class="price-card">
              <h3>${name}</h3>
              <p>${text}</p>
              <strong>${price}</strong>
              <a class="btn btn-outline light" href="${site.zalo}" target="_blank" rel="noopener">Hỏi gói này</a>
            </article>`
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="feedback-title">
        <div class="container">
          <div class="section-head center">
            <p class="eyebrow">Phản hồi khách hàng</p>
            <h2 id="feedback-title">Một số chia sẻ sau tư vấn</h2>
            <p>Đây là các phản hồi mẫu để thay bằng đánh giá thật khi thương hiệu có nội dung xác nhận từ khách hàng.</p>
          </div>
          <div class="testimonial-grid">
            ${testimonials
              .map(
                ([name, quote]) => `
            <article class="testimonial-card">
              <p>“${quote}”</p>
              <strong>${name}</strong>
            </article>`
              )
              .join("")}
          </div>
        </div>
      </section>

      <section id="blog" class="section section-cream" aria-labelledby="blog-title">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow">Bài viết phong thủy</p>
            <h2 id="blog-title">Chủ đề khách hàng thường tìm trước khi đặt lịch</h2>
            <p>Các bài viết này có thể phát triển thành chuyên mục SEO để thu hút khách đang tìm hiểu trên Google.</p>
          </div>
          <div class="blog-grid">
            ${blogPosts
              .map(
                ([title, text]) => `
            <article class="blog-card">
              <span>Bài viết</span>
              <h3>${title}</h3>
              <p>${text}</p>
              <a href="#dat-lich">Cần tư vấn trường hợp của tôi</a>
            </article>`
              )
              .join("")}
          </div>
        </div>
      </section>

      <section id="faq" class="section" aria-labelledby="faq-title">
        <div class="container faq-layout">
          <div class="section-head sticky-head">
            <p class="eyebrow">Câu hỏi thường gặp</p>
            <h2 id="faq-title">Giải đáp trước khi tư vấn phong thủy online hoặc trực tiếp</h2>
            <p>Nếu trường hợp của anh/chị có yếu tố riêng, nên gửi thông tin qua Zalo để được hướng dẫn chuẩn bị đúng hơn.</p>
          </div>
          <div class="faq-list">
            ${homeFaqs
              .map(
                ([question, answer], index) => `
            <details class="faq-item" ${index === 0 ? "open" : ""}>
              <summary>${question}</summary>
              <p>${answer}</p>
            </details>`
              )
              .join("")}
          </div>
        </div>
      </section>

      <section id="dat-lich" class="section contact-section" aria-labelledby="contact-title">
        <div class="container contact-grid">
          <div class="contact-copy">
            <p class="eyebrow">Liên hệ đặt lịch</p>
            <h2 id="contact-title">Gửi yêu cầu tư vấn phong thủy</h2>
            <p>Anh/chị điền thông tin cơ bản, Phong Thủy Phan Tâm sẽ liên hệ lại để xác nhận phạm vi tư vấn, thời gian và hình thức trao đổi phù hợp.</p>
            <div class="contact-actions">
              <a class="btn btn-gold" href="${site.zalo}" target="_blank" rel="noopener">Zalo</a>
              <a class="btn btn-outline light" href="tel:${site.phoneTel}">Gọi ngay</a>
              <a class="btn btn-outline light" href="${site.messenger}" target="_blank" rel="noopener">Messenger</a>
            </div>
            <p class="small-note">Nội dung tư vấn mang tính tham khảo và định hướng, không thay thế tư vấn pháp lý, y tế, tài chính hoặc kỹ thuật xây dựng chuyên nghiệp.</p>
          </div>
          <form class="booking-form" aria-label="Form gửi yêu cầu tư vấn">
            <label>Họ tên<input name="name" autocomplete="name" required></label>
            <label>Số điện thoại/Zalo<input name="phone" inputmode="tel" autocomplete="tel" required></label>
            <label>Năm sinh<input name="birth-year" inputmode="numeric" placeholder="Ví dụ: 1986"></label>
            <label>Nhu cầu tư vấn<textarea name="need" rows="4" placeholder="Nhà ở, hướng nhà, căn hộ, kinh doanh, chọn ngày tốt..." required></textarea></label>
            <label>Địa chỉ/khu vực<input name="area" placeholder="Quận/huyện, tỉnh/thành hoặc khu vực dự kiến"></label>
            <label>Thời gian muốn được liên hệ<input name="time" placeholder="Ví dụ: tối nay, cuối tuần, sau 18h"></label>
            <button class="btn btn-gold" type="submit">Gửi yêu cầu tư vấn</button>
            <p class="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </section>`;

  return layout({
    title: "Tư vấn phong thủy nhà ở, kinh doanh & ngày tốt | Phong Thủy Phan Tâm",
    description:
      "Phong Thủy Phan Tâm tư vấn phong thủy nhà ở, xem hướng nhà hợp tuổi, phong thủy kinh doanh, chọn ngày tốt, phong thủy căn hộ và tư vấn phong thủy online.",
    path: "/",
    body,
    schema: [businessSchema, faqSchema(homeFaqs)]
  });
};

const servicePage = (service) => {
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 4);
  const body = `
      <section class="page-hero">
        <div class="container page-hero-inner">
          <div class="page-hero-copy">
            <p class="eyebrow">${service.eyebrow}</p>
            <h1>${service.title}</h1>
            <p class="lead">${service.description}</p>
            <div class="cta-row">
              <a class="btn btn-gold" href="${site.zalo}" target="_blank" rel="noopener">Nhắn Zalo tư vấn</a>
              <a class="btn btn-outline light" href="tel:${site.phoneTel}">Gọi ${site.phoneDisplay}</a>
            </div>
          </div>
          <aside class="service-aside">
            <span class="service-icon">${service.icon}</span>
            <h2>Thông tin nên gửi trước</h2>
            <ul class="check-list">${listItems(service.info.slice(0, 3))}</ul>
          </aside>
        </div>
      </section>

      <section class="section">
        <div class="container content-split">
          <div class="content-stack">
            <article class="card content-card">
              <h2>Dịch vụ này phù hợp với ai?</h2>
              <ul class="check-list">${listItems(service.who)}</ul>
            </article>
            <article class="card content-card">
              <h2>Vấn đề khách hàng thường gặp</h2>
              <ul class="check-list">${listItems(service.problems)}</ul>
            </article>
            <article class="card content-card">
              <h2>Cần gửi thông tin gì?</h2>
              <ul class="check-list">${listItems(service.info)}</ul>
            </article>
            <article class="card content-card">
              <h2>Anh/chị nhận được gì sau tư vấn?</h2>
              <ul class="check-list">${listItems(service.receives)}</ul>
            </article>
            <article class="card content-card">
              <h2>Quy trình tư vấn</h2>
              <div class="mini-steps">
                ${service.process
                  .map(
                    (step, index) => `
                <div><span>${index + 1}</span><h3>${step}</h3><p>${["Tiếp nhận và làm rõ nhu cầu.", "Đối chiếu dữ liệu theo phạm vi tư vấn.", "Trao đổi qua Zalo, điện thoại hoặc trực tiếp.", "Gửi các gợi ý điều chỉnh nếu có."][index]}</p></div>`
                  )
                  .join("")}
              </div>
            </article>
            <article class="card content-card">
              <h2>FAQ</h2>
              <div class="faq-list">
                ${service.faqs
                  .map(
                    ([question, answer], index) => `
                <details class="faq-item" ${index === 0 ? "open" : ""}>
                  <summary>${question}</summary>
                  <p>${answer}</p>
                </details>`
                  )
                  .join("")}
              </div>
            </article>
          </div>
          <aside class="aside-stack">
            <div class="mini-card">
              <h3>Đặt lịch nhanh</h3>
              <p>Gửi thông tin qua Zalo để được hướng dẫn chuẩn bị hồ sơ tư vấn đúng trọng tâm.</p>
              <div class="cta-row stack">
                <a class="btn btn-gold" href="${site.zalo}" target="_blank" rel="noopener">Zalo tư vấn</a>
                <a class="btn btn-outline" href="tel:${site.phoneTel}">Gọi ngay</a>
              </div>
            </div>
            <div class="mini-card">
              <h3>Dịch vụ liên quan</h3>
              <div class="footer-links">
                ${related.map((item) => `<a href="/dich-vu/${item.slug}/">${item.shortTitle}</a>`).join("")}
              </div>
            </div>
            <div class="mini-card">
              <h3>Lưu ý quan trọng</h3>
              <p>Nội dung tư vấn mang tính tham khảo và định hướng, không thay thế tư vấn pháp lý, y tế, tài chính hoặc kỹ thuật xây dựng chuyên nghiệp.</p>
            </div>
          </aside>
        </div>
      </section>
${ctaBlock(`Trao đổi về ${service.shortTitle.toLowerCase()} cùng Phong Thủy Phan Tâm`)}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      telephone: `+84${site.phoneTel.slice(1)}`
    },
    areaServed: "Vietnam",
    url: `${site.baseUrl}/dich-vu/${service.slug}/`,
    description: service.description
  };

  return layout({
    title: `${service.title} | ${site.name}`,
    description: service.description,
    path: `/dich-vu/${service.slug}/`,
    body,
    schema: [serviceSchema, faqSchema(service.faqs)]
  });
};

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#7b1f28"/>
  <circle cx="32" cy="32" r="21" fill="#d6aa45"/>
  <circle cx="32" cy="32" r="14" fill="#173f35"/>
  <text x="32" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#fff">PT</text>
</svg>`;

const robots = `User-agent: *
Allow: /

Sitemap: ${site.baseUrl}/sitemap.xml
`;

const sitemap = () => {
  const urls = ["/", ...services.map((service) => `/dich-vu/${service.slug}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${site.baseUrl}${url}</loc>
    <lastmod>2026-06-17</lastmod>
    <changefreq>${url === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
};

async function build() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await mkdir(path.join(dist, "assets"), { recursive: true });

  await writeFile(path.join(dist, "index.html"), homePage(), "utf8");
  await writeFile(path.join(dist, "robots.txt"), robots, "utf8");
  await writeFile(path.join(dist, "sitemap.xml"), sitemap(), "utf8");
  await writeFile(path.join(dist, "assets", "favicon.svg"), favicon, "utf8");

  for (const service of services) {
    const pageDir = path.join(dist, "dich-vu", service.slug);
    await mkdir(pageDir, { recursive: true });
    await writeFile(path.join(pageDir, "index.html"), servicePage(service), "utf8");
  }

  await copyFile(path.join(root, "styles.css"), path.join(dist, "styles.css"));
  await copyFile(path.join(root, "script.js"), path.join(dist, "script.js"));

  const sourceAsset = path.join(root, "assets", "phan-tam-facebook.jpg");
  if (existsSync(sourceAsset)) {
    await cp(sourceAsset, path.join(dist, "assets", "phan-tam-facebook.jpg"));
  }
}

build();
