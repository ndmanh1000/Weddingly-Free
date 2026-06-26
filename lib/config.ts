export const config = {
    coupleNames: process.env.NEXT_PUBLIC_COUPLE_NAMES || "ĐỨC MẠNH-HÀ MY",
    eventDate: process.env.NEXT_PUBLIC_EVENT_DATE || "2025-01-01T00:00:00",
    groom: process.env.NEXT_PUBLIC_GROOM_NAME || "Default Groom",
    groomNickName: process.env.NEXT_PUBLIC_GROOM_NICKNAME || "Default Nickname",
    groomInstagram: process.env.NEXT_PUBLIC_GROOM_INSTAGRAM || "Default Instagram",
    groomBio: process.env.NEXT_PUBLIC_GROOM_BIO || "Default Bio",
    bride: process.env.NEXT_PUBLIC_BRIDE_NAME || "Default Bride",
    brideNickName: process.env.NEXT_PUBLIC_BRIDE_NICKNAME || "Default Nickname",
    brideInstagram: process.env.NEXT_PUBLIC_BRIDE_INSTAGRAM || "Default Instagram",
    brideBio: process.env.NEXT_PUBLIC_BRIDE_BIO || "Default Bio",
    bibleVerse: process.env.NEXT_PUBLIC_BIBLE_VERSE || "Default Bible Verseee",
    bibleVerseContent: process.env.NEXT_PUBLIC_BIBLE_VERSE_CONTENT || "Default Bible Verse Content",
    timeline_1: process.env.NEXT_PUBLIC_YEAR_1 || "Nguyễn Đức MẠnh-Hà My",
    timeline_1_content: process.env.NEXT_PUBLIC_YEAR_1_CONTENT || "Nguyễn Đức MẠnh",
    timeline_2: process.env.NEXT_PUBLIC_YEAR_2 || "Default Timeline 2",
    timeline_2_content: process.env.NEXT_PUBLIC_YEAR_2_CONTENT || "Default Timeline 2 Content",
    timeline_3: process.env.NEXT_PUBLIC_YEAR_3 || "Default Timeline 3",
    timeline_3_content: process.env.NEXT_PUBLIC_YEAR_3_CONTENT || "Default Timeline 3 Content",
    holyMatrimony: {
        enabled: process.env.NEXT_PUBLIC_HOLY_MATRIMONY === 'true',
        time: process.env.NEXT_PUBLIC_HOLY_MATRIMONY_TIME || "00:00",
        place: process.env.NEXT_PUBLIC_HOLY_MATRIMONY_PLACE || "Default Church",
        place_details: process.env.NEXT_PUBLIC_HOLY_MATRIMONY_PLACE_DETAILS || "Default Street",
        googleMapsLink: process.env.NEXT_PUBLIC_HOLY_MATRIMONY_GOOGLE_MAPS || "https://maps.app.goo.gl/vPmfWux29qYYfkJTA",
    },
    weddingReception: {
        enabled: process.env.NEXT_PUBLIC_WEDDING_RECEPTION === 'true',
        time: process.env.NEXT_PUBLIC_WEDDING_RECEPTION_TIME || "00:00",
        place: process.env.NEXT_PUBLIC_WEDDING_RECEPTION_PLACE || "Default Venue",
        place_details: process.env.NEXT_PUBLIC_WEDDING_RECEPTION_PLACE_DETAILS || "Default Street",
        googleMapsLink: process.env.NEXT_PUBLIC_WEDDING_RECEPTION_GOOGLE_MAPS || "https://maps.app.goo.gl/fQGiC37iEx6fcuNq8",
    },
    livestreaming: {
        enabled: process.env.NEXT_PUBLIC_LIVE_STREAMING === 'true',
        time: process.env.NEXT_PUBLIC_LIVE_STREAMING_TIME || "00:00",
        link: process.env.NEXT_PUBLIC_LIVE_STREAMING_LINK || "#",
        detail: process.env.NEXT_PUBLIC_LIVE_STREAMING_DETAIL || "Default Livestreaming Detail",
    },
    prewedding: {
        enabled: process.env.NEXT_PUBLIC_PREWEDDING === 'true',
        link: process.env.NEXT_PUBLIC_PREWEDDING_CODE_LINK_EMBED || "#",
        detail: process.env.NEXT_PUBLIC_PREWEDDING_DETAIL || "Default Prewedding Detail",
    },
    rsvp: {
        enabled: process.env.NEXT_PUBLIC_RSVP === 'true',
        detail: process.env.NEXT_PUBLIC_RSVP_DETAIL || "Default RSVP Detail",
    },
    thankyou: process.env.NEXT_PUBLIC_THANKYOU || "Default Thank You",
    thankyouDetail: process.env.NEXT_PUBLIC_THANKYOU_DETAIL || "Default Thank You Detail",
    families: {
        groomTitle: process.env.NEXT_PUBLIC_GROOM_FAMILY_TITLE || "NHÀ TRAI",
        groomFather: process.env.NEXT_PUBLIC_GROOM_FATHER || "Ông: Nguyễn Văn A",
        groomMother: process.env.NEXT_PUBLIC_GROOM_MOTHER || "Bà: Nguyễn Thị B",
        brideTitle: process.env.NEXT_PUBLIC_BRIDE_FAMILY_TITLE || "NHÀ GÁI",
        brideFather: process.env.NEXT_PUBLIC_BRIDE_FATHER || "Ông: Trần Văn C",
        brideMother: process.env.NEXT_PUBLIC_BRIDE_MOTHER || "Bà: Trần Thị D",
    },
    invitationMessage:
        process.env.NEXT_PUBLIC_INVITATION_MESSAGE ||
        "Trân trọng kính mời Quý khách tới dự bữa tiệc chung vui cùng gia đình chúng tôi",
    ceremonyLabel: process.env.NEXT_PUBLIC_CEREMONY_LABEL || "LỄ THÀNH HÔN",
    lunarDate:
        process.env.NEXT_PUBLIC_LUNAR_DATE || "(Tức ngày 16 tháng 3 năm Bính Ngọ)",
    groomHome: {
        title: process.env.NEXT_PUBLIC_GROOM_HOME_TITLE || "TƯ GIA NHÀ TRAI",
        address:
            process.env.NEXT_PUBLIC_GROOM_HOME_ADDRESS ||
            "Số nhà 36A, Ngõ 152 Nguyễn Đình Hoàn / Phường Nghĩa Đô, TP. Hà Nội",
        googleMapsLink:
            process.env.NEXT_PUBLIC_GROOM_HOME_MAPS ||
            "https://maps.app.goo.gl/vPmfWux29qYYfkJTA",
    },
    intimateParty: {
        label: process.env.NEXT_PUBLIC_INTIMATE_PARTY_LABEL || "TIỆC THÂN MẬT",
        time: process.env.NEXT_PUBLIC_INTIMATE_PARTY_TIME || "11 GIỜ 00",
    },
    mainVenue: {
        title: process.env.NEXT_PUBLIC_MAIN_VENUE_TITLE || "KHÁCH SẠN HACINCO",
        address:
            process.env.NEXT_PUBLIC_MAIN_VENUE_ADDRESS ||
            "Số 110 Thái Thịnh, Đống Đa, Hà Nội",
        googleMapsLink:
            process.env.NEXT_PUBLIC_MAIN_VENUE_MAPS ||
            "https://maps.app.goo.gl/fQGiC37iEx6fcuNq8",
    },
    galleryImages: (
        process.env.NEXT_PUBLIC_GALLERY_IMAGES ||
        "/slide_1.jpg,/slide_2.jpg,/slide_3.jpg,/slide_4.jpg,/slide_5.jpg,/slide_6.jpg,/slide_7.jpg,/slide_8.jpg,/slide_9.jpg,/hmdm.jpg"
    ).split(","),
};
